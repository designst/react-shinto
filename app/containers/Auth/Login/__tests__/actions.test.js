import { loginRequest, loginSuccess, loginFailure } from '../actions';

import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from '../constants';

describe('Login actions', () => {
  describe('loginRequest', () => {
    it('should return the correct type', () => {
      const username = 'username';
      const password = 'passoword';

      expect(loginRequest({ username, password })).toEqual({
        type: LOGIN_REQUEST,
        username,
        password,
      });
    });
  });

  describe('loginSuccess', () => {
    it('should return the correct type', () => {
      expect(loginSuccess()).toEqual({
        type: LOGIN_SUCCESS,
      });
    });
  });

  describe('loginFailure', () => {
    it('should return the correct type', () => {
      expect(loginFailure()).toEqual({
        type: LOGIN_FAILURE,
      });
    });
  });
});
