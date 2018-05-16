import createAction from 'utils/createAction';

import {
  AUTH_REGISTER_CONFIRM_REQUEST,
  AUTH_REGISTER_CONFIRM_SUCCESS,
  AUTH_REGISTER_CONFIRM_FAILURE,
} from './constants';

export const registerConfirmRequest = createAction(AUTH_REGISTER_CONFIRM_REQUEST);
export const registerConfirmSuccess = createAction(AUTH_REGISTER_CONFIRM_SUCCESS);
export const registerConfirmFailure = createAction(AUTH_REGISTER_CONFIRM_FAILURE);

export const registerConfirmRequestWait = createAction(
  AUTH_REGISTER_CONFIRM_REQUEST,
  AUTH_REGISTER_CONFIRM_SUCCESS,
  AUTH_REGISTER_CONFIRM_FAILURE,
);
