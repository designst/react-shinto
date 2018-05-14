import { call, put, takeLatest, getContext } from 'redux-saga/effects';

import createLogger from 'utils/createLogger';

import { AUTH_PASSWORD_RESET_REQUEST } from 'containers/Auth/Password/Reset/constants';

import {
  passwordResetSuccess,
  passwordResetFailure,
} from 'containers/Auth/Password/Reset/actions';

const logger = createLogger(__filename);

const authPasswordResetUrl = process.env.SHINTO_AUTH_PASSWORD_RESET_API_ENDPOINT;

export function* authPasswordReset(action) {
  const { email, username } = action;

  const apiService = yield getContext('apiService');

  logger('Password Reset');

  try {
    const response = yield call(apiService.post, authPasswordResetUrl, {
      email,
      username,
    });
    yield put(passwordResetSuccess(response.data));
  } catch (err) {
    yield put(passwordResetFailure(err));
  }
}

export default function* authPasswordResetData() {
  yield takeLatest(AUTH_PASSWORD_RESET_REQUEST, authPasswordReset);
}
