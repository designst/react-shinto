import { all, fork } from 'redux-saga/effects';

import authSaga from 'containers/Auth/saga';

export default function* rootSaga() {
  yield all([fork(authSaga)]);
}
