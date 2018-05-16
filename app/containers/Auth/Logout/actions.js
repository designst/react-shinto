import createAction from 'utils/createAction';

import { AUTH_LOGOUT_REQUEST, AUTH_LOGOUT_SUCCESS, AUTH_LOGOUT_FAILURE } from './constants';

export const logoutRequest = createAction(AUTH_LOGOUT_REQUEST);
export const logoutSuccess = createAction(AUTH_LOGOUT_SUCCESS);
export const logoutFailure = createAction(AUTH_LOGOUT_FAILURE);
