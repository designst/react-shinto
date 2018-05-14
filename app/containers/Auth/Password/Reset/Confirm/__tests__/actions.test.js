import {
  passwordResetConfirmRequest,
  passwordResetConfirmSuccess,
  passwordResetConfirmFailure,
} from '../actions';

import {
  AUTH_PASSWORD_RESET_CONFIRM_REQUEST,
  AUTH_PASSWORD_RESET_CONFIRM_SUCCESS,
  AUTH_PASSWORD_RESET_CONFIRM_FAILURE,
} from '../constants';

describe('Password ResetConfirm Actions', () => {
  describe('passwordResetConfirmRequest', () => {
    it('should return the correct type', () => {
      const payload = {
        email: 'email@email.com',
        username: 'username',
        password: 'password',
        passwordConfirm: 'password',
      };

      expect(passwordResetConfirmRequest(payload)).toEqual({
        type: AUTH_PASSWORD_RESET_CONFIRM_REQUEST,
        payload,
      });
    });
  });

  describe('passwordResetConfirmSuccess', () => {
    it('should return the correct type', () => {
      expect(passwordResetConfirmSuccess()).toEqual({
        type: AUTH_PASSWORD_RESET_CONFIRM_SUCCESS,
      });
    });
  });

  describe('passwordResetConfirmFailure', () => {
    it('should return the correct type', () => {
      expect(passwordResetConfirmFailure()).toEqual({
        type: AUTH_PASSWORD_RESET_CONFIRM_FAILURE,
      });
    });
  });
});
