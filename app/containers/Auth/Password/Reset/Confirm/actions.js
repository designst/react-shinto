import {
  AUTH_PASSWORD_RESET_CONFIRM_REQUEST,
  AUTH_PASSWORD_RESET_CONFIRM_SUCCESS,
  AUTH_PASSWORD_RESET_CONFIRM_FAILURE,
} from './constants';

export const passwordResetConfirmRequest = payload => ({
  type: AUTH_PASSWORD_RESET_CONFIRM_REQUEST,
  payload,
});

export const passwordResetConfirmSuccess = data => ({
  type: AUTH_PASSWORD_RESET_CONFIRM_SUCCESS,
  data,
});

export const passwordResetConfirmFailure = error => ({
  type: AUTH_PASSWORD_RESET_CONFIRM_FAILURE,
  error,
});
