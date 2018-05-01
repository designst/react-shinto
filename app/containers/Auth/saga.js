import { call, put, select, takeLatest, getContext } from 'redux-saga/effects';

import { makeSelectToken } from 'containers/Auth/selectors';
import { CHECK_AUTH_REQUEST } from 'containers/Auth/constants';
import { checkAuthSuccess, checkAuthFailure } from 'containers/Auth/actions';

export function* checkAuth() {
  const token = yield select(makeSelectToken());

  const apiService = yield getContext('apiService');

  try {
    const data = yield call(apiService.get('/auth/check', { token }));
    yield put(checkAuthSuccess(data));
  } catch (err) {
    yield put(checkAuthFailure(err));
  }
}

export default function* authData() {
  yield takeLatest(CHECK_AUTH_REQUEST, checkAuth);
}
