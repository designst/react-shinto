/**
 * authReducer
 *
 * Handles the authentication state.
 */

import fp from 'lodash/fp';

import createLogger from 'utils/createLogger';

import { CHECK_AUTH_SUCCESS, CHECK_AUTH_FAILURE } from './Check/constants';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from './Login/constants';

const logger = createLogger(__filename);

export const authInitialState = {
  token: null,
  isAuthenticated: false,
  isAuthenticating: false,
};

export default (state = authInitialState, action) => {
  logger('Handle Action: %s %o', action.type, state);

  switch (action.type) {
    case LOGIN_REQUEST:
      return fp.assign(state, {
        isAuthenticating: true,
      });
    case LOGIN_SUCCESS:
      return fp.assign(state, {
        isAuthenticated: true,
        isAuthenticating: false,
      });
    case LOGIN_FAILURE:
      return fp.assign(state, {
        isAuthenticating: false,
      });
    case CHECK_AUTH_SUCCESS:
      return fp.assign(state, {
        isAuthenticated: true,
      });
    case CHECK_AUTH_FAILURE:
      return fp.assign(state, {
        isAuthenticated: false,
      });
    default:
      return state;
  }
};
