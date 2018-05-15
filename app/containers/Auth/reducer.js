/**
 * authReducer
 *
 * Handles the authentication state.
 */

import fp from 'lodash/fp';

import createLogger from 'utils/createLogger';

import { API_AUTH_ERROR } from 'providers/Error/constants';

import { AUTH_CHECK_SUCCESS, AUTH_CHECK_FAILURE } from 'containers/Auth/Check/constants';

import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
} from 'containers/Auth/Login/constants';

import {
  AUTH_LOGOUT_REQUEST,
  AUTH_LOGOUT_SUCCESS,
  AUTH_LOGOUT_FAILURE,
} from 'containers/Auth/Logout/constants';

import {
  AUTH_REGISTER_REQUEST,
  AUTH_REGISTER_SUCCESS,
  AUTH_REGISTER_FAILURE,
} from 'containers/Auth/Register/constants';

import {
  AUTH_REGISTER_CONFIRM_REQUEST,
  AUTH_REGISTER_CONFIRM_SUCCESS,
  AUTH_REGISTER_CONFIRM_FAILURE,
} from 'containers/Auth/Register/Confirm/constants';

const logger = createLogger(__filename);

export const authInitialState = {
  token: null,
  isConfirmed: false,
  isConfirming: false,
  isAuthenticated: false,
  isAuthenticating: false,
};

export default (state = authInitialState, action) => {
  logger('Handle Action: %s %o', action.type, state);

  switch (action.type) {
    case API_AUTH_ERROR:
      return fp.assign(state, {
        isAuthenticated: false,
      });
    case AUTH_LOGIN_REQUEST:
      return fp.assign(state, {
        isAuthenticating: true,
      });
    case AUTH_LOGIN_SUCCESS: {
      const { token } = action.data;

      return fp.assign(state, {
        token,
        isAuthenticated: true,
        isAuthenticating: false,
      });
    }
    case AUTH_LOGIN_FAILURE:
      return fp.assign(state, {
        isAuthenticating: false,
      });
    case AUTH_LOGOUT_REQUEST:
      return state;
    case AUTH_LOGOUT_SUCCESS:
      return fp.assign(state, {
        isAuthenticated: false,
      });
    case AUTH_LOGOUT_FAILURE:
      return state;
    case AUTH_CHECK_SUCCESS:
      return fp.assign(state, {
        isAuthenticated: true,
      });
    case AUTH_CHECK_FAILURE:
      return fp.assign(state, {
        isAuthenticated: false,
      });
    case AUTH_REGISTER_REQUEST:
      return state;
    case AUTH_REGISTER_SUCCESS:
      return state;
    case AUTH_REGISTER_FAILURE:
      return state;

    case AUTH_REGISTER_CONFIRM_REQUEST:
      return fp.assign(state, {
        isConfirming: true,
      });
    case AUTH_REGISTER_CONFIRM_SUCCESS:
      return fp.assign(state, {
        isConfirmed: true,
        isConfirming: false,
      });
    case AUTH_REGISTER_CONFIRM_FAILURE:
      return fp.assign(state, {
        isConfirmed: false,
        isConfirming: false,
      });

    default:
      return state;
  }
};
