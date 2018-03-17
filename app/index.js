/* @flow */

import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import { renderRoutes } from 'react-router-config';
import { loadComponents } from 'loadable-components';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import routes from './routes';
import configureStore from './configureStore';
import registerServiceWorker from './registerServiceWorker';

// Get the initial state from server-side rendering
// noinspection JSUnresolvedVariable
const initialState = window.__INITIAL_STATE__;

const history = createHistory();
const store = configureStore(history, initialState);

const render = (Routes: Array<Object>) => {
  hydrate(
    <AppContainer>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          {renderRoutes(Routes)}
        </ConnectedRouter>
      </Provider>
    </AppContainer>,
    document.getElementById('root'),
  );

  registerServiceWorker();
};

// Load all components needed before starting rendering (loadable-components setup)
loadComponents().then(() => {
  render(routes);
});

if (module.hot) {
  module.hot.accept('./routes', () => {
    try {
      const nextRoutes = require('./routes').default;

      render(nextRoutes);
    } catch (error) {
      console.error(`==> Routes hot reloading error ${error}`);
    }
  });
}
