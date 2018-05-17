import { expectSaga } from 'redux-saga-test-plan';

import authReducer from 'containers/Auth/reducer';
import { authLogout } from 'containers/Auth/Logout/saga';

describe('authLogoutData', () => {
  let authLogoutGenerator;

  beforeEach(() => {
    authLogoutGenerator = authLogout();

    const selectDescriptor = authLogoutGenerator.next().value;
    expect(selectDescriptor).toMatchSnapshot();
  });

  it('should dispatch the authLogoutSuccess action if it requests the data successfully', () =>
    expectSaga(authLogout)
      .provide({
        getContext: () => ({
          get: url => (url === '/auth/logout' ? {} : {}),
        }),
      })
      .withReducer(authReducer)
      .hasFinalState({
        token: null,
        isConfirmed: false,
        isConfirming: false,
        isAuthenticated: false,
        isAuthenticating: false,
      })
      .run());

  it('should dispatch the authLogoutFailure action if it requests the data unsuccessfully', () =>
    expectSaga(authLogout)
      .withReducer(authReducer)
      .run());
});
