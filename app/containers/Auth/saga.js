import { all, call, put, fork, takeLatest, getContext } from 'redux-saga/effects';

import authCheckSaga from 'containers/Auth/Check/saga';
import authLoginSaga from 'containers/Auth/Login/saga';
import authLogoutSaga from 'containers/Auth/Logout/saga';

import createLogger from 'utils/createLogger';

import { AUTH_API_REQUEST } from 'containers/Auth/constants';
import { authApiSuccess, authApiFailure } from 'containers/Auth/actions';

const logger = createLogger(__filename);

export function* authApi() {
  const apiService = yield getContext('apiService');

  logger('API');

  try {
    const response = yield call(apiService.get, '/');
    console.log(response.data);
    yield put(authApiSuccess(response.data));
  } catch (err) {
    yield put(authApiFailure(err));
  }
}

export function* authApiData() {
  yield takeLatest(AUTH_API_REQUEST, authApi);
}

export default function* authData() {
  yield all([fork(authApiData), fork(authCheckSaga), fork(authLoginSaga), fork(authLogoutSaga)]);
}
