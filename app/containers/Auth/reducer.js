/**
 * authReducer
 *
 * Handles the authentication state.
 */

import fp from 'lodash/fp';

import createLogger from 'utils/createLogger';

import { CHECK_AUTH_FAILURE, CHECK_AUTH_REQUEST, CHECK_AUTH_SUCCESS } from './constants';

const logger = createLogger(__filename);

export const authInitialState = {
  token: null,
  isAuthenticated: null,
  isAuthenticating: null,
};

export default (state = authInitialState, action) => {
  logger('Handle Action: %s %o', action.type, state);

  switch (action.type) {
    /* eslint-disable-next-line */
    case CHECK_AUTH_REQUEST:
      logger('CHECK_AUTH_REQUEST');

      logger(state);

      const newState = fp.assign(state, {
        isAuthenticating: true,
      });

      logger(newState);

      return newState;
    case CHECK_AUTH_SUCCESS:
      logger('CHECK_AUTH_SUCCESS');

      return fp.assign(state, {
        isAuthenticated: true,
        isAuthenticating: false,
      });
    case CHECK_AUTH_FAILURE:
      logger('CHECK_AUTH_FAILURE');

      return fp.assign(state, {
        isAuthenticating: false,
      });
    default:
      return state;
  }
};
