import { call, put, takeLatest, getContext } from 'redux-saga/effects';

import createLogger from 'utils/createLogger';

import { AUTH_PASSWORD_CHANGE_REQUEST } from 'containers/Auth/Password/Change/constants';

import {
  passwordChangeSuccess,
  passwordChangeFailure,
} from 'containers/Auth/Password/Change/actions';

const logger = createLogger(__filename);

const authPasswordChangeUrl = process.env.SHINTO_AUTH_PASSWORD_CHANGE_API_ENDPOINT;

export function* authPasswordChange(action) {
  const { oldPassword, newPassword, newPasswordConfirm } = action.payload;

  const apiService = yield getContext('apiService');

  logger('Password Change');

  try {
    const response = yield call(apiService.post, authPasswordChangeUrl, {
      oldPassword,
      newPassword,
      newPasswordConfirm,
    });
    yield put(passwordChangeSuccess(response.data));
  } catch (err) {
    yield put(passwordChangeFailure(err));
  }
}

export default function* authPasswordChangeData() {
  yield takeLatest(AUTH_PASSWORD_CHANGE_REQUEST, authPasswordChange);
}
