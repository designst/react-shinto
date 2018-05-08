import { all, fork } from 'redux-saga/effects';

import authCheckSaga from 'containers/Auth/Check/saga';
import authLoginSaga from 'containers/Auth/Login/saga';

export default function* authData() {
  yield all([fork(authCheckSaga), fork(authLoginSaga)]);
}
