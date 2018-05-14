import { call, put, takeLatest, getContext } from 'redux-saga/effects';

import createLogger from 'utils/createLogger';

import { AUTH_REGISTER_REQUEST } from 'containers/Auth/Register/constants';
import { registerSuccess, registerFailure } from 'containers/Auth/Register/actions';

const logger = createLogger(__filename);

const authRegisterUrl = process.env.SHINTO_AUTH_REGISTER_API_ENDPOINT;

export function* authRegister(action) {
  const { email, username, password, passwordConfirm } = action;

  const apiService = yield getContext('apiService');

  logger('Register: %s', email);

  try {
    const response = yield call(apiService.post, authRegisterUrl, {
      email,
      username,
      password,
      passwordConfirm,
    });
    yield put(registerSuccess(response.data));
  } catch (err) {
    yield put(registerFailure(err));
  }
}

export default function* authRegisterData() {
  yield takeLatest(AUTH_REGISTER_REQUEST, authRegister);
}
