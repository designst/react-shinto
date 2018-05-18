import glob from 'glob';
import path from 'path';
import chalk from 'chalk';
import React from 'react';
import fp from 'lodash/fp';
import Helmet from 'react-helmet';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import createHistory from 'history/createMemoryHistory';
import { getLoadableState } from 'loadable-components/server';
import { renderRoutes, matchRoutes } from 'react-router-config';

// JSS
import { SheetsRegistry } from 'react-jss/lib/jss';
import JssProvider from 'react-jss/lib/JssProvider';
import { MuiThemeProvider, createGenerateClassName } from 'material-ui/styles';

import createLogger from 'utils/createLogger';
import configureStore from 'utils/configureStore';

import getSagaInjectors from 'utils/sagaInjectors';
import getModelInjectors from 'utils/modelInjectors';
import getReducerInjectors from 'utils/reducerInjectors';

import ConnectedMessageProvider from 'providers/Message';
import ConnectedLanguageProvider from 'providers/Language';

import { authInitialState } from 'containers/Auth/reducer';
import { routeInitialState } from 'utils/createReducer';

import paths from '../../config/paths';
import theme from '../../app/theme';
import routes from '../../app/routes';
import renderHtml from '../renderHtml';
import webpackAssets from '../../public/webpack-assets.json';

import { translationMessages } from '../../app/i18n';

const logger = createLogger(__filename);

const { dllPlugin } = require(paths.appPackageJson);

const authRequired = process.env.SHINTO_AUTH_REQUIRED === 'true';
const serverSideRenderingEnabled = process.env.SHINTO_SERVER_SIDE_RENDERING_ENABLED === 'true';

module.exports = app => {
  app.get('*', (req, res) => {
    logger('Handle Request: %s', req.path);

    // Get auth token from cookie
    let token = null;

    if (req.cookies && process.env.SHINTO_AUTH_TOKEN_COOKIE) {
      token = req.cookies[process.env.SHINTO_AUTH_TOKEN_COOKIE];
    }

    const baseUrl = `${req.protocol}://${req.headers.host}`;

    // Create history
    const history = createHistory();

    // Create store with initial state
    const store = configureStore(history, {
      auth: fp.assign(authInitialState, {
        token,
      }),
      route: fp.assign(routeInitialState, {
        baseUrl,
      }),
    });

    const sagaInjectors = getSagaInjectors(store);
    const modelInjectors = getModelInjectors(store);
    const reducerInjectors = getReducerInjectors(store);

    // Create a sheeetsRegistry instance.
    const sheetsRegistry = new SheetsRegistry();

    const generateClassName = createGenerateClassName();

    const loadBranchData = () => {
      const branch = matchRoutes(routes, req.path);

      const promises = branch.map(({ route, match }) => {
        // noinspection JSUnresolvedVariable
        if (route.dataLoaders) {
          // noinspection JSUnresolvedFunction
          return Promise.all(
            route
              .dataLoaders({
                store,
                params: match.params,
                sagaInjectors,
                reducerInjectors,
              })
              .map(dataLoader =>
                dataLoader({
                  store,
                  sagaInjectors,
                  modelInjectors,
                  reducerInjectors,
                }),
              ),
          );
        }

        return Promise.resolve(null);
      });

      return Promise.all(promises);
    };

    (async () => {
      if (authRequired) {
        try {
          logger('Authentication is required');

          const checkAuthSaga = await import('containers/Auth/Check/saga');
          const checkAuthActions = await import('containers/Auth/Check/actions');

          store.runSaga(checkAuthSaga.default);

          await store.dispatch(checkAuthActions.checkAuthRequestWait());
        } catch (err) {
          logger('Authentication failed.');
        }
      }

      if (serverSideRenderingEnabled) {
        try {
          logger('Loading server side data.');
          // Load data from server-side first
          await loadBranchData();
        } catch (err) {
          logger('Server side data loading failed: %s', err);
        }
      }

      try {
        const staticContext = {};
        const AppComponent = (
          <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
            <MuiThemeProvider theme={theme} sheetsManager={new Map()}>
              <Provider store={store}>
                <ConnectedMessageProvider>
                  <ConnectedLanguageProvider messages={translationMessages}>
                    {/* Setup React-Router server-side rendering */}
                    <StaticRouter context={staticContext} location={req.path}>
                      {renderRoutes(routes)}
                    </StaticRouter>
                  </ConnectedLanguageProvider>
                </ConnectedMessageProvider>
              </Provider>
            </MuiThemeProvider>
          </JssProvider>
        );

        // Check if the render result contains a redirect, if so we need to set
        // the specific status and redirect header and end the response
        if (staticContext.url) {
          res.status(301).setHeader('Location', staticContext.url);
          res.end();

          return;
        }

        // Extract loadable state from application tree (loadable-components setup)
        getLoadableState(AppComponent).then(loadableState => {
          // Grab the CSS from our sheetsRegistry.
          const css = sheetsRegistry.toString();
          // noinspection JSUnresolvedFunction
          const head = Helmet.renderStatic();
          const initialState = store.getState();
          const loadableStateTag = loadableState.getScriptTag();

          // Check page status
          const status = staticContext.status === '404' ? 404 : 200;

          let assets = webpackAssets;
          let htmlContent = '';

          if (__DEV__) {
            assets = {
              'main.js': path.join(paths.servedPath, 'static/js/main.js'),
            };

            const dllGlob = path.join(paths.appPublic, `${dllPlugin.name}/*.dll.js`);

            glob.sync(dllGlob).forEach(dllPath => {
              const filename = path.basename(dllPath);

              assets[filename] = path.join(
                paths.servedPath,
                `public/${dllPlugin.name}/${filename}`,
              );
            });
          }

          if (serverSideRenderingEnabled) {
            htmlContent = renderToString(AppComponent);
          }

          logger('__INITIAL_STATE__: %o', initialState);

          // Pass the route and initial state into html template
          res
            .status(status)
            .send(renderHtml(css, head, assets, htmlContent, initialState, loadableStateTag));
        });
      } catch (err) {
        res.status(404).send('Not Found :(');

        console.error(chalk.red(`==> Rendering routes error: ${err}`));
      }
    })();
  });

  return app;
};
