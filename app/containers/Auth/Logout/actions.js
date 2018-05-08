import { AUTH_LOGOUT_REQUEST, AUTH_LOGOUT_SUCCESS, AUTH_LOGOUT_FAILURE } from './constants';

export const logoutRequest = () => ({
  type: AUTH_LOGOUT_REQUEST,
});

export const logoutSuccess = data => ({
  type: AUTH_LOGOUT_SUCCESS,
  data,
});

export const logoutFailure = error => ({
  type: AUTH_LOGOUT_FAILURE,
  error,
});
