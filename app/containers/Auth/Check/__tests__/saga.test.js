import { expectSaga } from 'redux-saga-test-plan';

import authReducer from 'containers/Auth/reducer';
import { authCheck } from 'containers/Auth/Check/saga';

describe('authCheckData', () => {
  let authCheckGenerator;

  beforeEach(() => {
    authCheckGenerator = authCheck();

    const selectDescriptor = authCheckGenerator.next().value;
    expect(selectDescriptor).toMatchSnapshot();
  });

  it('should dispatch the authCheckSuccess action if it requests the data successfully', () =>
    expectSaga(authCheck)
      .provide({
        select: () => 'token',
        getContext: () => ({
          post: url => (url === '/' ? {} : {}),
        }),
      })
      .withReducer(authReducer)
      .hasFinalState({
        token: null,
        isAuthenticated: true,
        isAuthenticating: false,
      })
      .run());

  it('should dispatch the authCheckFailure action if it requests the data without token', () =>
    expectSaga(authCheck)
      .provide({
        select: () => null,
        getContext: () => ({
          post: () => ({}),
        }),
      })
      .withReducer(authReducer)
      .run());

  it('should dispatch the authCheckFailure action if it requests the data unsuccessfully', () =>
    expectSaga(authCheck)
      .provide({
        select: () => 'token',
        getContext: () => ({
          post: () => {
            throw new Error('Error');
          },
        }),
      })
      .withReducer(authReducer)
      .run());
});
