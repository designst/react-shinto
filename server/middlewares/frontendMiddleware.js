import hpp from 'hpp';
import path from 'path';
import chalk from 'chalk';
import React from 'react';
import morgan from 'morgan';
import helmet from 'helmet';
import Helmet from 'react-helmet';
import favicon from 'serve-favicon';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import createHistory from 'history/createMemoryHistory';
import { getLoadableState } from 'loadable-components/server';
import { renderRoutes, matchRoutes } from 'react-router-config';

import routes from '../../app/routes';
import assets from '../../public/webpack-assets.json';
import configureStore from '../../app/utils/configureStore';

import renderHtml from '../renderHtml';

const isProd = process.env.NODE_ENV === 'production';

module.exports = (app, urls, port) => {
  // Prevent HTTP parameter pollution.
  app.use(hpp());
  // Use helmet to secure Express with various HTTP headers
  app.use(helmet());

  // Use for http request debug (show errors only)
  app.use(morgan('dev', { skip: (req, res) => res.statusCode < 400 }));
  app.use(favicon(path.resolve(process.cwd(), 'public/favicon.ico')));

  if (isProd) {
    const addProdMiddleware = require('./addProdMiddleware');
    const webpackConfig = require('../../config/webpack/webpack.prod.babel');
    addProdMiddleware(app, webpackConfig);
  } else {
    const webpackConfig = require('../../config/webpack/webpack.dev.babel');
    const addDevMiddleware = require('./addDevMiddleware');
    addDevMiddleware(app, urls, port, webpackConfig);
  }

  app.get('*', (req, res) => {
    const history = createHistory();
    const store = configureStore(history);

    const loadBranchData = () => {
      const branch = matchRoutes(routes, req.path);

      const promises = branch.map(({ route, match }) => {
        if (route.loadData) {
          return Promise.all(
            route
              .loadData({ params: match.params, getState: store.getState })
              .map(item => store.dispatch(item)),
          );
        }

        return Promise.resolve(null);
      });

      return Promise.all(promises);
    };

    (async () => {
      try {
        // Load data from server-side first
        await loadBranchData();

        const staticContext = {};
        const AppComponent = (
          <Provider store={store}>
            {/* Setup React-Router server-side rendering */}
            <StaticRouter context={staticContext} location={req.path}>
              {renderRoutes(routes)}
            </StaticRouter>
          </Provider>
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
          // noinspection JSUnresolvedFunction
          const head = Helmet.renderStatic();
          const htmlContent = renderToString(AppComponent);
          const initialState = store.getState();
          const loadableStateTag = loadableState.getScriptTag();

          // Check page status
          const status = staticContext.status === '404' ? 404 : 200;

          // Pass the route and initial state into html template
          res
            .status(status)
            .send(
              renderHtml(
                head,
                assets,
                htmlContent,
                initialState,
                loadableStateTag,
              ),
            );
        });
      } catch (err) {
        res.status(404).send('Not Found :(');

        console.error(chalk.red(`==> 😭  Rendering routes error: ${err}`));
      }
    })();
  });

  return app;
};
