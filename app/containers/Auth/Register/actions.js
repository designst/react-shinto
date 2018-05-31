import createAction from 'utils/createAction';

import {
  AUTH_REGISTER_REQUEST,
  AUTH_REGISTER_SUCCESS,
  AUTH_REGISTER_FAILURE,
  AUTH_REGISTER_VALIDATE_REQUEST,
  AUTH_REGISTER_VALIDATE_SUCCESS,
  AUTH_REGISTER_VALIDATE_FAILURE,
} from './constants';

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

export const registerValidateSuccess = createAction(AUTH_REGISTER_VALIDATE_SUCCESS);
export const registerValidateFailure = createAction(AUTH_REGISTER_VALIDATE_FAILURE);

export const registerValidateRequest = payload => (dispatch, getState, apiService) => {
  dispatch({
    type: AUTH_REGISTER_VALIDATE_REQUEST,
    payload,
  });

  return apiService
    .post(process.env.SHINTO_AUTH_REGISTER_VALIDATE_API_ENDPOINT, payload)
    .then(registerValidateSuccess)
    .catch(registerValidateFailure);
};
