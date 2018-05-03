/**
 * Combine all reducers in this file and export the combined reducers.
 */

import fp from 'lodash/fp';
import { combineReducers } from 'redux';
import { LOCATION_CHANGE } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import authReducer from 'containers/Auth/reducer';
import globalReducer from 'containers/App/reducer';
import languageProviderReducer from 'providers/Language/reducer';

/**
 * routeReducer
 *
 * The reducer merges route location changes into our immutable state.
 * The change is necessitated by moving to react-router-redux@5
 */

// Initial routing state
const routeInitialState = {
  baseUrl: '',
  location: null,
};

/**
 * Merge route into the global application state.
 */
const routeReducer = (state = routeInitialState, action) => {
  switch (action.type) {
    /* istanbul ignore next */
    case LOCATION_CHANGE:
      return fp.assign(state, {
        location: action.payload,
      });
    default:
      return state;
  }
};

export const rootReducers = {
  auth: authReducer,
  form: formReducer,
  route: routeReducer,
  global: globalReducer,
  language: languageProviderReducer,
};

/**
 * Creates model reducers for each injected rematch model definition.
 *
 * Source: https://github.com/rematch/rematch/blob/master/src/redux.ts
 *
 * @param {Object} injectedModels - A map of injected rematch models.
 */
export const createModelReducers = injectedModels => {
  const modelReducers = {};

  Object.keys(injectedModels).forEach(injectedModelKey => {
    const injectedModel = injectedModels[injectedModelKey];
    const injectedModelReducers = {};

    Object.keys(injectedModel.reducers).forEach(modelReducerKey => {
      const modelReducer = injectedModel.reducers[modelReducerKey];

      const action = `${injectedModelKey}/${modelReducerKey}`;

      injectedModelReducers[action] = modelReducer;
    });

    modelReducers[injectedModelKey] = (state = injectedModel.state, action) => {
      if (typeof injectedModelReducers[action.type] === 'function') {
        return injectedModelReducers[action.type](state, action.payload, action.meta);
      }

      return state;
    };
  });

  return modelReducers;
};

/**
 * Creates the main reducer with the dynamically injected ones.
 */
export default (injectedModels, injectedReducers, initialStateReducers) => {
  const modelReducers = createModelReducers(injectedModels);

  injectedReducers = Object.keys(injectedReducers)
    .filter(injectedReducer => !Object.keys(injectedModels).includes(injectedReducer))
    .reduce((obj, key) => {
      obj[key] = injectedReducers[key];
      return obj;
    }, {});

  initialStateReducers = Object.keys(initialStateReducers)
    .filter(
      initialStateReducer =>
        !Object.keys(injectedModels).includes(initialStateReducer) &&
        !Object.keys(injectedReducers).includes(initialStateReducer),
    )
    .reduce((obj, key) => {
      obj[key] = initialStateReducers[key];
      return obj;
    }, {});

  return combineReducers({
    ...rootReducers,
    ...modelReducers,
    ...injectedReducers,
    ...initialStateReducers,
  });
};
