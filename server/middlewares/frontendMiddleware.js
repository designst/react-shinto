import chalk from 'chalk';
import React from 'react';
import Helmet from 'react-helmet';
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
import getSagaInjectors from '../../app/utils/sagaInjectors';
import getReducerInjectors from '../../app/utils/reducerInjectors';

module.exports = app => {
  app.get('*', (req, res) => {
    const history = createHistory();
    const store = configureStore(history);
    const sagaInjectors = getSagaInjectors(store);
    const reducerInjectors = getReducerInjectors(store);

    const loadBranchData = () => {
      const branch = matchRoutes(routes, req.path);

      const promises = branch.map(({ route, match }) => {
        if (route.loadData) {
          return Promise.all(
            route
              .loadData({
                store,
                params: match.params,
                sagaInjectors,
                reducerInjectors,
              })
              .map(loadFn => loadFn()),
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
