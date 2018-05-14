import { AUTH_REGISTER_REQUEST, AUTH_REGISTER_SUCCESS, AUTH_REGISTER_FAILURE } from './constants';

export const registerRequest = ({ email, username, password, passwordConfirm }) => ({
  type: AUTH_REGISTER_REQUEST,
  email,
  username,
  password,
  passwordConfirm,
});

export const registerSuccess = data => ({
  type: AUTH_REGISTER_SUCCESS,
  data,
});

export const registerFailure = error => ({
  type: AUTH_REGISTER_FAILURE,
  error,
});
