import { expectSaga } from 'redux-saga-test-plan';

import authReducer from 'containers/Auth/reducer';
import { authApi } from 'containers/Auth/saga';

describe('authApiData', () => {
  let authApiGenerator;

  beforeEach(() => {
    authApiGenerator = authApi();

    const selectDescriptor = authApiGenerator.next().value;
    expect(selectDescriptor).toMatchSnapshot();
  });

  it('should dispatch the authApiSuccess action if it requests the data successfully', () =>
    expectSaga(authApi)
      .provide({
        getContext() {
          return {
            get: url => (url === '/' ? {} : {}),
          };
        },
      })
      .withReducer(authReducer)
      .hasFinalState({
        token: null,
        isAuthenticated: false,
        isAuthenticating: false,
      })
      .run());

  it('should dispatch the authApiFailure action if it requests the data unsuccessfully', () =>
    expectSaga(authApi)
      .withReducer(authReducer)
      .run());
});
