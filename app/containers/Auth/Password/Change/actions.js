import {
  AUTH_PASSWORD_CHANGE_REQUEST,
  AUTH_PASSWORD_CHANGE_SUCCESS,
  AUTH_PASSWORD_CHANGE_FAILURE,
} from './constants';

export const passwordChangeRequest = payload => ({
  type: AUTH_PASSWORD_CHANGE_REQUEST,
  payload,
});

export const passwordChangeSuccess = data => ({
  type: AUTH_PASSWORD_CHANGE_SUCCESS,
  data,
});

export const passwordChangeFailure = error => ({
  type: AUTH_PASSWORD_CHANGE_FAILURE,
  error,
});
