/**
 * authReducer
 *
 * Handles the authentication state.
 */

import Debug from 'debug';
import fp from 'lodash/fp';

import { CHECK_AUTH_FAILURE, CHECK_AUTH_REQUEST, CHECK_AUTH_SUCCESS } from './constants';

const debug = new Debug('shinto:containers:auth:reducer');

const initialState = {
  token: null,
  isAuthenticated: false,
  isAuthenticating: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CHECK_AUTH_REQUEST:
      debug('CHECK_AUTH_REQUEST');

      return fp.assign(state, {
        isAuthenticating: true,
      });
    case CHECK_AUTH_SUCCESS:
      debug('CHECK_AUTH_SUCCESS');

      return fp.assign(state, {
        isAuthenticated: true,
        isAuthenticating: false,
      });
    case CHECK_AUTH_FAILURE:
      debug('CHECK_AUTH_FAILURE');

      return fp.assign(state, {
        isAuthenticating: false,
      });
    default:
      return state;
  }
};
