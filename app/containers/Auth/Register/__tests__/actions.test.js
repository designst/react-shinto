import { registerRequest, registerSuccess, registerFailure } from '../actions';

import { AUTH_REGISTER_REQUEST, AUTH_REGISTER_SUCCESS, AUTH_REGISTER_FAILURE } from '../constants';

describe('Register actions', () => {
  describe('registerRequest', () => {
    it('should return the correct type', () => {
      const payload = {
        email: 'email@email.com',
        username: 'username',
        password: 'password',
        passwordConfirm: 'password',
      };

      expect(registerRequest(payload)).toEqual({
        type: AUTH_REGISTER_REQUEST,
        payload,
      });
    });
  });

  describe('registerSuccess', () => {
    it('should return the correct type', () => {
      expect(registerSuccess()).toEqual({
        type: AUTH_REGISTER_SUCCESS,
      });
    });
  });

  describe('registerFailure', () => {
    it('should return the correct type', () => {
      expect(registerFailure()).toEqual({
        type: AUTH_REGISTER_FAILURE,
      });
    });
  });
});
