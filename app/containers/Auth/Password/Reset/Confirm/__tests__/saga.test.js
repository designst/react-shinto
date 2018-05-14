import { expectSaga } from 'redux-saga-test-plan';

import authReducer from 'containers/Auth/reducer';
import authPasswordResetConfirmData from 'containers/Auth/Password/Reset/Confirm/saga';
import { AUTH_PASSWORD_RESET_CONFIRM_REQUEST } from 'containers/Auth/Password/Reset/Confirm/constants';

describe('authPasswordResetConfirmData', () => {
  let authPasswordResetConfirmGenerator;

  beforeEach(() => {
    authPasswordResetConfirmGenerator = authPasswordResetConfirmData();

    const selectDescriptor = authPasswordResetConfirmGenerator.next().value;
    expect(selectDescriptor).toMatchSnapshot();
  });

  it('should dispatch the authPasswordResetConfirmSuccess action if it requests the data successfully', () => {
    const token = 'token';

    return expectSaga(authPasswordResetConfirmData)
      .provide({
        getContext: () => ({
          post: url =>
            url === '/auth/password/reset/confirm'
              ? {
                  data: {
                    token,
                  },
                }
              : {},
        }),
      })
      .dispatch({
        type: AUTH_PASSWORD_RESET_CONFIRM_REQUEST,
        payload: {
          token,
        },
      })
      .withReducer(authReducer)
      .run();
  });

  it('should dispatch the authPasswordResetConfirmFailure action if it requests the data unsuccessfully', () => {
    const token = 'token';

    return expectSaga(authPasswordResetConfirmData)
      .dispatch({
        type: AUTH_PASSWORD_RESET_CONFIRM_REQUEST,
        payload: {
          token,
        },
      })
      .withReducer(authReducer)
      .run();
  });
});
