/**
 * Combine all reducers in this file and export the combined reducers.
 */

import fp from 'lodash/fp';
import { combineReducers } from 'redux';
import { LOCATION_CHANGE } from 'react-router-redux';

import globalReducer from '../containers/App/reducer';
import languageProviderReducer from '../providers/Language/reducer';

/*
 * routeReducer
 *
 * The reducer merges route location changes into our immutable state.
 * The change is necessitated by moving to react-router-redux@5
 *
 */

// Initial routing state
const routeInitialState = {
  location: null,
};

/**
 * Merge route into the global application state
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

/**
 * Creates the main reducer with the dynamically injected ones
 */
export default injectedReducers =>
  combineReducers({
    route: routeReducer,
    global: globalReducer,
    language: languageProviderReducer,
    ...injectedReducers,
  });
