import { logoutRequest, logoutSuccess, logoutFailure } from '../actions';

import { AUTH_LOGOUT_REQUEST, AUTH_LOGOUT_SUCCESS, AUTH_LOGOUT_FAILURE } from '../constants';

describe('Logout Actions', () => {
  describe('logoutRequest', () => {
    it('should return the correct type', () => {
      expect(logoutRequest()).toEqual({
        type: AUTH_LOGOUT_REQUEST,
      });
    });
  });

  describe('logoutSuccess', () => {
    it('should return the correct type', () => {
      expect(logoutSuccess()).toEqual({
        type: AUTH_LOGOUT_SUCCESS,
      });
    });
  });

  describe('logoutFailure', () => {
    it('should return the correct type', () => {
      expect(logoutFailure()).toEqual({
        type: AUTH_LOGOUT_FAILURE,
      });
    });
  });
});
