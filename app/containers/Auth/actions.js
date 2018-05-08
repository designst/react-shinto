import { AUTH_API_REQUEST, AUTH_API_SUCCESS, AUTH_API_FAILURE } from 'containers/Auth/constants';

export const authApiRequest = () => ({
  type: AUTH_API_REQUEST,
});

export const authApiSuccess = data => ({
  type: AUTH_API_SUCCESS,
  data,
});

export const authApiFailure = error => ({
  type: AUTH_API_FAILURE,
  error,
});
