import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from './constants';

export const loginRequest = ({ username, password }) => ({
  type: LOGIN_REQUEST,
  username,
  password,
});

export const loginSuccess = data => ({
  type: LOGIN_SUCCESS,
  data,
});

export const loginFailure = error => ({
  type: LOGIN_FAILURE,
  error,
});
