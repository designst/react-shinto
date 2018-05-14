import { AUTH_REGISTER_REQUEST, AUTH_REGISTER_SUCCESS, AUTH_REGISTER_FAILURE } from './constants';

export const registerRequest = payload => ({
  type: AUTH_REGISTER_REQUEST,
  payload,
});

export const registerSuccess = data => ({
  type: AUTH_REGISTER_SUCCESS,
  data,
});

export const registerFailure = error => ({
  type: AUTH_REGISTER_FAILURE,
  error,
});
