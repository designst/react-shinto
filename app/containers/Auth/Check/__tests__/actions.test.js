import { ERROR_ACTION, WAIT_FOR_ACTION } from 'redux-wait-for-action';

import {
  checkAuthRequest,
  checkAuthSuccess,
  checkAuthFailure,
  checkAuthRequestWait,
} from 'containers/Auth/Check/actions';

import {
  AUTH_CHECK_REQUEST,
  AUTH_CHECK_SUCCESS,
  AUTH_CHECK_FAILURE,
} from 'containers/Auth/Check/constants';

describe('Auth Check Actions', () => {
  describe('checkAuthRequest', () => {
    it('should return the correct type', () => {
      expect(checkAuthRequest()).toEqual({
        type: AUTH_CHECK_REQUEST,
      });
    });
  });

  describe('checkAuthSuccess', () => {
    it('should return the correct type', () => {
      const data = 'Data';

      expect(checkAuthSuccess(data)).toEqual({
        type: AUTH_CHECK_SUCCESS,
        data,
      });
    });
  });

  describe('checkAuthFailure', () => {
    it('should return the correct type', () => {
      const error = 'Error';

      expect(checkAuthFailure(error)).toEqual({
        type: AUTH_CHECK_FAILURE,
        error,
      });
    });
  });

  describe('checkAuthRequestWait', () => {
    it('should return the correct type', () => {
      expect(checkAuthRequestWait()).toEqual({
        type: AUTH_CHECK_REQUEST,
        [WAIT_FOR_ACTION]: AUTH_CHECK_SUCCESS,
        [ERROR_ACTION]: AUTH_CHECK_FAILURE,
      });
    });
  });
});
