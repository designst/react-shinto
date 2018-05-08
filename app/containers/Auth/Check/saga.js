import { call, put, select, takeLatest, getContext } from 'redux-saga/effects';

import createLogger from 'utils/createLogger';

import { makeSelectToken } from 'containers/Auth/selectors';
import { AUTH_CHECK_REQUEST } from 'containers/Auth/Check/constants';
import { checkAuthSuccess, checkAuthFailure } from 'containers/Auth/Check/actions';

const logger = createLogger(__filename);

const authCheckUrl = process.env.SHINTO_AUTH_CHECK_API_ENDPOINT;

export function* authCheck() {
  const token = yield select(makeSelectToken());

  if (token) {
    const apiService = yield getContext('apiService');

    logger('Check: %s', token);

    try {
      const response = yield call(apiService.post, authCheckUrl, { token });
      yield put(checkAuthSuccess(response.data));
    } catch (err) {
      yield put(checkAuthFailure(err));
    }
  } else {
    yield put(checkAuthFailure());
  }
}

export default function* authCheckData() {
  yield takeLatest(AUTH_CHECK_REQUEST, authCheck);
}
