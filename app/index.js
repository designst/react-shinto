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
import configureStore from './utils/configureStore';
import registerServiceWorker from './utils/registerServiceWorker';
import ConnectedLanguageProvider from './providers/Language';

import { translationMessages } from './i18n';

// Get the initial state from server-side rendering
// noinspection JSUnresolvedVariable
const initialState = window.__INITIAL_STATE__;

const history = createHistory();
const store = configureStore(history, initialState);

const render = (Routes: Array<Object>, messages) => {
  hydrate(
    <AppContainer>
      <Provider store={store}>
        <ConnectedLanguageProvider messages={messages}>
          <ConnectedRouter history={history}>
            {renderRoutes(Routes)}
          </ConnectedRouter>
        </ConnectedLanguageProvider>
      </Provider>
    </AppContainer>,
    document.getElementById('root'),
  );

  registerServiceWorker();
};

// Load all components needed before starting rendering (loadable-components setup)
loadComponents().then(() => {
  if (!window.Intl) {
    new Promise(resolve => {
      resolve(import('intl'));
    })
      .then(() =>
        Promise.all([
          import('intl/locale-data/jsonp/en.js'),
          import('intl/locale-data/jsonp/de.js'),
        ]),
      )
      .then(() => render(routes, translationMessages))
      .catch(error => {
        console.error(`==> Messages hot reloading error ${error}`);
      });
  } else {
    render(routes, translationMessages);
  }
});

if (module.hot) {
  module.hot.accept(['./i18n', './routes'], () => {
    try {
      const nextRoutes = require('./routes').default;
      render(nextRoutes, require('./i18n').translationMessages);
    } catch (error) {
      console.error(`==> Routes hot reloading error ${error}`);
    }
  });
}
