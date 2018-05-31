import { push } from 'react-router-redux';
import { call, put, takeLatest, getContext } from 'redux-saga/effects';

import createLogger from 'utils/createLogger';
import { addMessage } from 'providers/Message/actions';

import { AUTH_REGISTER_REQUEST } from 'containers/Auth/Register/constants';

import { registerSuccess, registerFailure } from 'containers/Auth/Register/actions';

const logger = createLogger(__filename);

const authRegisterUrl = process.env.SHINTO_AUTH_REGISTER_API_ENDPOINT;

export function* authRegister(action) {
  const { email, username, password, passwordConfirm } = action.payload;

  const apiService = yield getContext('apiService');

  logger('Register: %s %s', email, username);

  try {
    const response = yield call(apiService.post, authRegisterUrl, {
      email,
      username,
      password,
      passwordConfirm,
    });

    yield put(registerSuccess(response.data));

    yield put(
      addMessage({
        type: 'success',
        text: `Successfully sent confirmation mail to ${email}`,
      }),
    );

    // Redirect to login page
    yield put(push('/auth/login'));
  } catch (err) {
    yield put(registerFailure(err));
  }
}

export default function* authRegisterData() {
  yield takeLatest(AUTH_REGISTER_REQUEST, authRegister);
}
