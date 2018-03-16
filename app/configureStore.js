/* @flow */

import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'react-router-redux';
import { compose, createStore, applyMiddleware } from 'redux';

// import type { Store } from '../types';
import createReducer from './createReducer';

const sagaMiddleware = createSagaMiddleware();

export default (history, initialState) => {
  // Create the store with two middlewares
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. routerMiddleware: Syncs the location/URL path to the state
  const middlewares = [
    sagaMiddleware,
    routerMiddleware(history),
  ];

  let composeEnhancers = compose;

  if (process.env.NODE_ENV !== 'production' && typeof window === 'object') {
    const loggerMiddleware = createLogger();
    middlewares.push(loggerMiddleware);

    // If Redux DevTools Extension is installed use it, otherwise use Redux compose
    /* eslint-disable no-underscore-dangle */
    // noinspection JSUnresolvedVariable
    if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
      // noinspection JSUnresolvedFunction
      composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Prevent recomputing reducers for `replaceReducer`
        shouldHotReload: false,
      });
    }
    /* eslint-enable */
  }

  const enhancers = [
    applyMiddleware(...middlewares),
  ];

  const store = createStore(
    createReducer(),
    initialState,
    composeEnhancers(...enhancers)
  );

  // Extensions
  store.runSaga = sagaMiddleware.run;
  store.injectSagas = {}; // Saga registry
  store.injectReducers = {}; // Reducer registry

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./createReducer', () => {
      try {
        const nextReducer = require('./createReducer').default;

        store.replaceReducer(nextReducer);
      } catch (error) {
        console.error(`==> 😭  Reducer hot reloading error ${error}`);
      }
    });
  }

  return store;
};
