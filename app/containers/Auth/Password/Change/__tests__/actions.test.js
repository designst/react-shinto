import { passwordChangeRequest, passwordChangeSuccess, passwordChangeFailure } from '../actions';

import {
  AUTH_PASSWORD_CHANGE_REQUEST,
  AUTH_PASSWORD_CHANGE_SUCCESS,
  AUTH_PASSWORD_CHANGE_FAILURE,
} from '../constants';

describe('Password Change Actions', () => {
  describe('passwordChangeRequest', () => {
    it('should return the correct type', () => {
      const payload = {
        email: 'email@email.com',
        username: 'username',
        password: 'password',
        passwordConfirm: 'password',
      };

      expect(passwordChangeRequest(payload)).toEqual({
        type: AUTH_PASSWORD_CHANGE_REQUEST,
        payload,
      });
    });
  });

  describe('passwordChangeSuccess', () => {
    it('should return the correct type', () => {
      expect(passwordChangeSuccess()).toEqual({
        type: AUTH_PASSWORD_CHANGE_SUCCESS,
      });
    });
  });

  describe('passwordChangeFailure', () => {
    it('should return the correct type', () => {
      expect(passwordChangeFailure()).toEqual({
        type: AUTH_PASSWORD_CHANGE_FAILURE,
      });
    });
  });
});
