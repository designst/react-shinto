import fp from 'lodash/fp';

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

import authReducer, { authInitialState } from '../reducer';

describe('authReducer', () => {
  it('should return the initial state', () => {
    expect(authReducer(undefined, {})).toEqual(authInitialState);
  });

  it('should handle API_AUTH_ERROR', () => {
    expect(
      authReducer(undefined, {
        type: API_AUTH_ERROR,
      }),
    ).toEqual(authInitialState);
  });

  it('should handle AUTH_LOGIN_REQUEST', () => {
    expect(
      authReducer(undefined, {
        type: AUTH_LOGIN_REQUEST,
      }),
    ).toEqual(
      fp.assign(authInitialState, {
        isAuthenticating: true,
      }),
    );
  });

  it('should handle AUTH_LOGIN_SUCCESS', () => {
    const token = 'token';

    expect(
      authReducer(undefined, {
        type: AUTH_LOGIN_SUCCESS,
        data: {
          token,
        },
      }),
    ).toEqual(
      fp.assign(authInitialState, {
        token,
        isAuthenticated: true,
        isAuthenticating: false,
      }),
    );
  });

  it('should handle AUTH_LOGIN_FAILURE', () => {
    expect(
      authReducer(undefined, {
        type: AUTH_LOGIN_FAILURE,
      }),
    ).toEqual(authInitialState);
  });

  it('should handle AUTH_LOGOUT_REQUEST', () => {
    expect(
      authReducer(undefined, {
        type: AUTH_LOGOUT_REQUEST,
      }),
    ).toEqual(authInitialState);
  });

  it('should handle AUTH_LOGOUT_SUCCESS', () => {
    expect(
      authReducer(undefined, {
        type: AUTH_LOGOUT_SUCCESS,
      }),
    ).toEqual(authInitialState);
  });

  it('should handle AUTH_LOGOUT_FAILURE', () => {
    expect(
      authReducer(undefined, {
        type: AUTH_LOGOUT_FAILURE,
      }),
    ).toEqual(authInitialState);
  });

  it('should handle AUTH_CHECK_SUCCESS', () => {
    expect(
      authReducer(undefined, {
        type: AUTH_CHECK_SUCCESS,
      }),
    ).toEqual(
      fp.assign(authInitialState, {
        isAuthenticated: true,
      }),
    );
  });

  it('should handle AUTH_CHECK_FAILURE', () => {
    expect(
      authReducer(undefined, {
        type: AUTH_CHECK_FAILURE,
      }),
    ).toEqual(authInitialState);
  });
});
