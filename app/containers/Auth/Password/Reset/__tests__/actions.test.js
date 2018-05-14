import { passwordResetRequest, passwordResetSuccess, passwordResetFailure } from '../actions';

import {
  AUTH_PASSWORD_RESET_REQUEST,
  AUTH_PASSWORD_RESET_SUCCESS,
  AUTH_PASSWORD_RESET_FAILURE,
} from '../constants';

describe('Password Reset Actions', () => {
  describe('passwordResetRequest', () => {
    it('should return the correct type', () => {
      const payload = {
        email: 'email@email.com',
        username: 'username',
        password: 'password',
        passwordConfirm: 'password',
      };

      expect(passwordResetRequest(payload)).toEqual({
        type: AUTH_PASSWORD_RESET_REQUEST,
        payload,
      });
    });
  });

  describe('passwordResetSuccess', () => {
    it('should return the correct type', () => {
      expect(passwordResetSuccess()).toEqual({
        type: AUTH_PASSWORD_RESET_SUCCESS,
      });
    });
  });

  describe('passwordResetFailure', () => {
    it('should return the correct type', () => {
      expect(passwordResetFailure()).toEqual({
        type: AUTH_PASSWORD_RESET_FAILURE,
      });
    });
  });
});
