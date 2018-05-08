import { ERROR_ACTION, WAIT_FOR_ACTION } from 'redux-wait-for-action';

import { AUTH_CHECK_REQUEST, AUTH_CHECK_SUCCESS, AUTH_CHECK_FAILURE } from './constants';

export const checkAuthRequest = () => ({
  type: AUTH_CHECK_REQUEST,
});

export const checkAuthSuccess = data => ({
  type: AUTH_CHECK_SUCCESS,
  data,
});

export const checkAuthFailure = error => ({
  type: AUTH_CHECK_FAILURE,
  error,
});

export const checkAuthRequestWait = () => ({
  ...checkAuthRequest(),
  [WAIT_FOR_ACTION]: AUTH_CHECK_SUCCESS,
  [ERROR_ACTION]: AUTH_CHECK_FAILURE,
});
