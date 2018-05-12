import { expectSaga } from 'redux-saga-test-plan';

import authReducer from 'containers/Auth/reducer';
import { authLogin } from 'containers/Auth/Login/saga';

describe('authLoginData', () => {
  let authLoginGenerator;

  beforeEach(() => {
    authLoginGenerator = authLogin();

    const selectDescriptor = authLoginGenerator.next().value;
    expect(selectDescriptor).toMatchSnapshot();
  });

  it('should dispatch the authLoginSuccess action if it requests the data successfully', () => {
    const username = 'username';
    const password = 'password';

    return expectSaga(authLogin, username, password)
      .provide({
        getContext: () => ({
          post: url =>
            url === '/auth/login'
              ? {
                  data: {
                    token: 'token',
                    isAuthenticated: true,
                    isAuthenticating: false,
                  },
                }
              : {},
        }),
      })
      .withReducer(authReducer)
      .hasFinalState({
        token: 'token',
        isAuthenticated: true,
        isAuthenticating: false,
      })
      .run();
  });

  it('should dispatch the authLoginFailure action if it requests the data unsuccessfully', () => {
    const username = 'username';
    const password = 'password';

    return expectSaga(authLogin, username, password)
      .withReducer(authReducer)
      .run();
  });
});
