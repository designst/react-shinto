import { expectSaga } from 'redux-saga-test-plan';

import authReducer from 'containers/Auth/reducer';
import authPasswordResetData from 'containers/Auth/Password/Reset/saga';
import { AUTH_PASSWORD_RESET_REQUEST } from 'containers/Auth/Password/Reset/constants';

describe('authPasswordResetData', () => {
  let authPasswordResetGenerator;

  beforeEach(() => {
    authPasswordResetGenerator = authPasswordResetData();

    const selectDescriptor = authPasswordResetGenerator.next().value;
    expect(selectDescriptor).toMatchSnapshot();
  });

  it('should dispatch the authPasswordResetSuccess action if it requests the data successfully', () => {
    const email = 'email@email.com';
    const username = 'username';

    return expectSaga(authPasswordResetData)
      .provide({
        getContext: () => ({
          post: url =>
            url === '/auth/password/reset'
              ? {
                  data: {
                    email,
                    username,
                  },
                }
              : {},
        }),
      })
      .dispatch({
        type: AUTH_PASSWORD_RESET_REQUEST,
        payload: {
          email,
          username,
        },
      })
      .withReducer(authReducer)
      .run();
  });

  it('should dispatch the authPasswordResetFailure action if it requests the data unsuccessfully', () => {
    const email = 'email@email.com';
    const username = 'username';

    return expectSaga(authPasswordResetData)
      .dispatch({
        type: AUTH_PASSWORD_RESET_REQUEST,
        payload: {
          email,
          username,
        },
      })
      .withReducer(authReducer)
      .run();
  });
});
