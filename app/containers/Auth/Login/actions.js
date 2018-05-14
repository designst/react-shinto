import { AUTH_LOGIN_REQUEST, AUTH_LOGIN_SUCCESS, AUTH_LOGIN_FAILURE } from './constants';

export const loginRequest = payload => ({
  type: AUTH_LOGIN_REQUEST,
  payload,
});

export const loginSuccess = data => ({
  type: AUTH_LOGIN_SUCCESS,
  data,
});

export const loginFailure = error => ({
  type: AUTH_LOGIN_FAILURE,
  error,
});
