import { authApiRequest, authApiSuccess, authApiFailure } from 'containers/Auth/actions';
import { AUTH_API_REQUEST, AUTH_API_SUCCESS, AUTH_API_FAILURE } from 'containers/Auth/constants';

describe('Auth actions', () => {
  describe('authApiRequest', () => {
    it('should return the correct type', () => {
      expect(authApiRequest()).toEqual({
        type: AUTH_API_REQUEST,
      });
    });
  });

  describe('authApiSuccess', () => {
    it('should return the correct type', () => {
      const data = 'Data';

      expect(authApiSuccess(data)).toEqual({
        type: AUTH_API_SUCCESS,
        data,
      });
    });
  });

  describe('authApiFailure', () => {
    it('should return the correct type', () => {
      const error = 'Error';

      expect(authApiFailure(error)).toEqual({
        type: AUTH_API_FAILURE,
        error,
      });
    });
  });
});
