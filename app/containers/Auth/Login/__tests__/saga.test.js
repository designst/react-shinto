import { expectSaga } from 'redux-saga-test-plan';

import authReducer from 'containers/Auth/reducer';
import authLoginData from 'containers/Auth/Login/saga';
import { AUTH_LOGIN_REQUEST } from 'containers/Auth/Login/constants';

describe('authLoginData', () => {
  let authLoginGenerator;

  beforeEach(() => {
    authLoginGenerator = authLoginData();

    const selectDescriptor = authLoginGenerator.next().value;
    expect(selectDescriptor).toMatchSnapshot();
  });

  it('should dispatch the authLoginSuccess action if it requests the data successfully', () => {
    const token = 'token';
    const username = 'username';
    const password = 'password';

    return expectSaga(authLoginData)
      .provide({
        getContext: () => ({
          post: url =>
            url === '/auth/login'
              ? {
                  data: {
                    token,
                    isAuthenticated: true,
                    isAuthenticating: false,
                  },
                }
              : {},
        }),
      })
      .dispatch({
        type: AUTH_LOGIN_REQUEST,
        payload: {
          username,
          password,
        },
      })
      .withReducer(authReducer)
      .hasFinalState({
        token,
        isConfirmed: false,
        isConfirming: false,
        isAuthenticated: true,
        isAuthenticating: false,
      })
      .run();
  });

  it('should dispatch the authLoginFailure action if it requests the data unsuccessfully', () => {
    const username = 'username';
    const password = 'password';

    return expectSaga(authLoginData)
      .dispatch({
        type: AUTH_LOGIN_REQUEST,
        payload: {
          username,
          password,
        },
      })
      .withReducer(authReducer)
      .run();
  });
});
