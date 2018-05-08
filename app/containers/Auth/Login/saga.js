import { call, put, takeLatest, getContext } from 'redux-saga/effects';

import createLogger from 'utils/createLogger';

import { LOGIN_REQUEST } from 'containers/Auth/Login/constants';
import { loginSuccess, loginFailure } from 'containers/Auth/Login/actions';

const logger = createLogger(__filename);

const authLoginUrl = process.env.SHINTO_AUTH_LOGIN_API_ENDPOINT;

export function* authLogin({ username, password }) {
  const apiService = yield getContext('apiService');

  logger('Login: %s', username);

  try {
    const data = yield call(apiService.get, authLoginUrl, { username, password });
    yield put(loginSuccess(data));
  } catch (err) {
    yield put(loginFailure(err));
  }
}

export default function* authLoginData() {
  yield takeLatest(LOGIN_REQUEST, authLogin);
}
