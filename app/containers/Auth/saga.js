import Debug from 'debug';
import { call, put, select, takeLatest, getContext } from 'redux-saga/effects';

import { makeSelectToken } from 'containers/Auth/selectors';
import { CHECK_AUTH_REQUEST } from 'containers/Auth/constants';
import { checkAuthSuccess, checkAuthFailure } from 'containers/Auth/actions';

const debug = new Debug('shinto:containers:auth:saga');

export function* checkAuth() {
  const token = yield select(makeSelectToken());

  debug('checkAuth: token=%s', token);

  const apiService = yield getContext('apiService');

  debug(apiService);
  debug(token);

  try {
    const data = yield call(apiService.get(process.env.SHINTO_AUTH_CHECK_API_ENDPOINT, { token }));
    yield put(checkAuthSuccess(data));
  } catch (err) {
    debug(err);
    yield put(checkAuthFailure(err));
  }
}

export default function* authData() {
  yield takeLatest(CHECK_AUTH_REQUEST, checkAuth);
}
