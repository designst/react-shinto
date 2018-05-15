import { call, put, takeLatest, getContext } from 'redux-saga/effects';

import createLogger from 'utils/createLogger';

import { AUTH_REGISTER_CONFIRM_REQUEST } from 'containers/Auth/Register/Confirm/constants';

import {
  registerConfirmSuccess,
  registerConfirmFailure,
} from 'containers/Auth/Register/Confirm/actions';

const logger = createLogger(__filename);

const authRegisterConfirmUrl = process.env.SHINTO_AUTH_REGISTER_CONFIRM_API_ENDPOINT;

export function* authRegisterConfirm(action) {
  const { token } = action.payload;

  const apiService = yield getContext('apiService');

  logger('Register Confirm: %s', token);

  try {
    const response = yield call(apiService.post, authRegisterConfirmUrl, {
      token,
    });
    yield put(registerConfirmSuccess(response.data));
  } catch (err) {
    yield put(registerConfirmFailure(err));
  }
}

export default function* authRegisterConfirmData() {
  yield takeLatest(AUTH_REGISTER_CONFIRM_REQUEST, authRegisterConfirm);
}
