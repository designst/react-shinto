import { ERROR_ACTION, WAIT_FOR_ACTION } from 'redux-wait-for-action';

import { CHECK_AUTH_REQUEST, CHECK_AUTH_SUCCESS, CHECK_AUTH_FAILURE } from './constants';

export const checkAuthRequest = () => ({
  type: CHECK_AUTH_REQUEST,
});

export const checkAuthSuccess = data => ({
  type: CHECK_AUTH_SUCCESS,
  data,
});

export const checkAuthFailure = error => ({
  type: CHECK_AUTH_FAILURE,
  error,
});

export const checkAuthRequestWait = () => ({
  ...checkAuthRequest(),
  [WAIT_FOR_ACTION]: CHECK_AUTH_SUCCESS,
  [ERROR_ACTION]: CHECK_AUTH_FAILURE,
});
