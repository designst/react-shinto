import {
  AUTH_PASSWORD_RESET_REQUEST,
  AUTH_PASSWORD_RESET_SUCCESS,
  AUTH_PASSWORD_RESET_FAILURE,
} from './constants';

export const passwordResetRequest = payload => ({
  type: AUTH_PASSWORD_RESET_REQUEST,
  payload,
});

export const passwordResetSuccess = data => ({
  type: AUTH_PASSWORD_RESET_SUCCESS,
  data,
});

export const passwordResetFailure = error => ({
  type: AUTH_PASSWORD_RESET_FAILURE,
  error,
});
