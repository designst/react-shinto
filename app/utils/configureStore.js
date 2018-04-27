/* @flow */

import fp from 'lodash/fp';
import thunk from 'redux-thunk';
import { init } from '@rematch/core';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import createLoadingPlugin from '@rematch/loading';
import { routerMiddleware } from 'react-router-redux';
import createWaitForActionMiddleware from 'redux-wait-for-action';

import createReducer, { rootReducers } from './createReducer';
import createApiService, { createApiServicePlugin } from './apiService';

const loadingPluginOptions = {};
const loadingPlugin = createLoadingPlugin(loadingPluginOptions);

export const createFakeReducers = initialState => {
  const fakeReducer = (state = {}) => state;
  const rootReducerKeys = Object.keys(rootReducers);

  return Object.keys(initialState)
    .filter(key => !rootReducerKeys.includes(key))
    .reduce((reducers, key) => {
      reducers[key] = fakeReducer;
      return reducers;
    }, {});
};

export default (history, initialState, configuration = {}) => {
  // Create the store with three middlewares
  // 1. thunkMiddleware: Makes thunk work
  // 2. sagaMiddleware: Makes redux-sagas work
  // 3. routerMiddleware: Syncs the location/URL path to the state

  const { auth: { token } = {} } = initialState;
  const apiService = createApiService(token);

  const sagaMiddleware = createSagaMiddleware({
    context: {
      apiService,
    },
  });

  const waitForActionMiddleware = createWaitForActionMiddleware();

  const middlewares = [thunk, sagaMiddleware, waitForActionMiddleware, routerMiddleware(history)];

  if (__DEV__ && __CLIENT__) {
    const loggerMiddleware = createLogger();
    middlewares.push(loggerMiddleware);
  }

  // Create fake reducers which are not already known by the injectedReducers map
  // but which are expected by the server-side rendered initialState object.
  // The created fakeReducers will be replaced after client-side reducers are injected.
  const initialStateReducers = createFakeReducers(initialState);

  const store = init(
    fp.assign(
      {
        redux: {
          middlewares,
          initialState,
          reducers: rootReducers,
          combineReducers: rematchReducers => {
            const { injectedReducers = {} } = store || {};
            // Override rematch combineReducers to handle the fakeReducers which are reducers
            // not already known but expected by the initialState object and to handle the
            // already injectedReducers.

            return createReducer(
              // injected modelReducers are already created by the rematch model function,
              // so we can ignore them here to avoid additional loops.
              {},
              {
                ...rematchReducers,
                ...injectedReducers,
              },
              initialStateReducers,
            );
          },
        },
        plugins: [loadingPlugin, createApiServicePlugin(apiService)],
      },
      configuration,
    ),
  );

  apiService.store = store;

  // Extensions
  store.runSaga = sagaMiddleware.run;
  store.injectedSagas = {}; // Saga registry
  store.injectedModels = {}; // Model registry
  store.injectedReducers = {}; // Reducer registry
  store.initialStateReducers = initialStateReducers;

  /* istanbul ignore next */
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./createReducer', () => {
      try {
        const createNextReducer = require('./createReducer').default;
        const nextReducer = createNextReducer(
          store.injectedModels,
          store.injectedReducers,
          store.initialStateReducers,
        );

        store.replaceReducer(nextReducer);
      } catch (error) {
        console.error(`==> Reducer hot reloading error ${error}`);
      }
    });
  }

  return store;
};
