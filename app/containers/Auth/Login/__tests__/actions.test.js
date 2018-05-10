import { loginRequest, loginSuccess, loginFailure } from '../actions';

import { AUTH_LOGIN_REQUEST, AUTH_LOGIN_SUCCESS, AUTH_LOGIN_FAILURE } from '../constants';

describe('Login actions', () => {
  describe('loginRequest', () => {
    it('should return the correct type', () => {
      const username = 'username';
      const password = 'passoword';

      expect(loginRequest({ username, password })).toEqual({
        type: AUTH_LOGIN_REQUEST,
        username,
        password,
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
