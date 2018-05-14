import { call, put, takeLatest, getContext } from 'redux-saga/effects';

import createLogger from 'utils/createLogger';

import { AUTH_PASSWORD_RESET_CONFIRM_REQUEST } from 'containers/Auth/Password/Reset/Confirm/constants';

import {
  passwordResetConfirmSuccess,
  passwordResetConfirmFailure,
} from 'containers/Auth/Password/Reset/Confirm/actions';

const logger = createLogger(__filename);

const authPasswordResetConfirmUrl = process.env.SHINTO_AUTH_PASSWORD_RESET_CONFIRM_API_ENDPOINT;

export function* authPasswordResetConfirm(action) {
  const { token } = action;

  const apiService = yield getContext('apiService');

  logger('Password Reset Confirm: %s', token);

  try {
    const response = yield call(apiService.post, authPasswordResetConfirmUrl, {
      token,
    });
    yield put(passwordResetConfirmSuccess(response.data));
  } catch (err) {
    yield put(passwordResetConfirmFailure(err));
  }
}

export default function* authPasswordResetConfirmData() {
  yield takeLatest(AUTH_PASSWORD_RESET_CONFIRM_REQUEST, authPasswordResetConfirm);
}
