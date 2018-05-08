import { call, put, takeLatest, getContext } from 'redux-saga/effects';

import createLogger from 'utils/createLogger';

import { AUTH_LOGOUT_REQUEST } from 'containers/Auth/Logout/constants';
import { logoutSuccess, logoutFailure } from 'containers/Auth/Logout/actions';

const logger = createLogger(__filename);

const authLogoutUrl = process.env.SHINTO_AUTH_LOGOUT_API_ENDPOINT;

export function* authLogout() {
  const apiService = yield getContext('apiService');

  logger('Logout');

  try {
    const response = yield call(apiService.get, authLogoutUrl);
    yield put(logoutSuccess(response.data));
  } catch (err) {
    yield put(logoutFailure(err));
  }
}

export default function* authLogoutData() {
  yield takeLatest(AUTH_LOGOUT_REQUEST, authLogout);
}
