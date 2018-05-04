import { call, put, select, takeLatest, getContext } from 'redux-saga/effects';

import createLogger from 'utils/createLogger';

import { makeSelectToken } from 'containers/Auth/Check/selectors';
import { CHECK_AUTH_REQUEST } from 'containers/Auth/Check/constants';
import { checkAuthSuccess, checkAuthFailure } from 'containers/Auth/Check/actions';

const logger = createLogger(__filename);

const checkAuthUrl = process.env.SHINTO_AUTH_CHECK_API_ENDPOINT;

export function* checkAuth() {
  const token = yield select(makeSelectToken());

  const apiService = yield getContext('apiService');

  logger('Check Auth: %s', token);

  try {
    const data = yield call(apiService.get, checkAuthUrl, { token });
    yield put(checkAuthSuccess(data));
  } catch (err) {
    yield put(checkAuthFailure(err));
  }
}

export default function* checkAuthData() {
  yield takeLatest(CHECK_AUTH_REQUEST, checkAuth);
}
