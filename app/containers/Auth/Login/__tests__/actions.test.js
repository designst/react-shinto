import { loginRequest, loginSuccess, loginFailure } from '../actions';

import { AUTH_LOGIN_REQUEST, AUTH_LOGIN_SUCCESS, AUTH_LOGIN_FAILURE } from '../constants';

describe('Login actions', () => {
  describe('loginRequest', () => {
    it('should return the correct type', () => {
      const payload = {
        username: 'username',
        password: 'password',
      };

      expect(loginRequest(payload)).toEqual({
        type: AUTH_LOGIN_REQUEST,
        payload,
      });
    });
  });

  describe('loginSuccess', () => {
    it('should return the correct type', () => {
      expect(loginSuccess()).toEqual({
        type: AUTH_LOGIN_SUCCESS,
      });
    });
  });

  describe('loginFailure', () => {
    it('should return the correct type', () => {
      expect(loginFailure()).toEqual({
        type: AUTH_LOGIN_FAILURE,
      });
    });
  });
});
