import { call, put, select, takeLatest, getContext } from 'redux-saga/effects';

import createLogger from 'utils/createLogger';

import { makeSelectToken } from 'containers/Auth/selectors';
import { CHECK_AUTH_REQUEST } from 'containers/Auth/constants';
import { checkAuthSuccess, checkAuthFailure } from 'containers/Auth/actions';

const logger = createLogger(__filename);

export function* checkAuth() {
  const token = yield select(makeSelectToken());

  const apiService = yield getContext('apiService');

  try {
    const data = yield call(apiService.get, process.env.SHINTO_AUTH_CHECK_API_ENDPOINT, { token });
    yield put(checkAuthSuccess(data));
  } catch (err) {
    logger(err);
    yield put(checkAuthFailure(err));
  }
}

export default function* authData() {
  yield takeLatest(CHECK_AUTH_REQUEST, checkAuth);
}
