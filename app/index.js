/* @flow */

import React from 'react';
import { create } from 'jss';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import { renderRoutes } from 'react-router-config';
import { loadComponents } from 'loadable-components';
import { ConnectedRouter } from 'react-router-redux';
import JssProvider from 'react-jss/lib/JssProvider';
import createHistory from 'history/createBrowserHistory';

import configureStore from 'utils/configureStore';
import registerServiceWorker from 'utils/registerServiceWorker';
import ConnectedLanguageProvider from 'providers/Language';

import { jssPreset, MuiThemeProvider, createGenerateClassName } from 'material-ui/styles';

import theme from './theme';
import routes from './routes';

import { translationMessages } from './i18n';

// Get the initial state from server-side rendering
// noinspection JSUnresolvedVariable
const initialState = window.__INITIAL_STATE__;

const history = createHistory();
const store = configureStore(history, initialState);

const jss = create(jssPreset());
jss.options.insertionPoint = document.getElementById('jss-insertion-point');

const generateClassName = createGenerateClassName();

const render = (Routes: Array<Object>, messages) => {
  hydrate(
    <AppContainer>
      <JssProvider jss={jss} generateClassName={generateClassName}>
        <MuiThemeProvider theme={theme}>
          <Provider store={store}>
            <ConnectedLanguageProvider messages={messages}>
              <ConnectedRouter history={history}>{renderRoutes(Routes)}</ConnectedRouter>
            </ConnectedLanguageProvider>
          </Provider>
        </MuiThemeProvider>
      </JssProvider>
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
