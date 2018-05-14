import { expectSaga } from 'redux-saga-test-plan';

import authReducer from 'containers/Auth/reducer';
import authPasswordChangeData from 'containers/Auth/Password/Change/saga';
import { AUTH_PASSWORD_CHANGE_REQUEST } from 'containers/Auth/Password/Change/constants';

describe('authPasswordChangeData', () => {
  let authPasswordChangeGenerator;

  beforeEach(() => {
    authPasswordChangeGenerator = authPasswordChangeData();

    const selectDescriptor = authPasswordChangeGenerator.next().value;
    expect(selectDescriptor).toMatchSnapshot();
  });

  it('should dispatch the authPasswordChangeSuccess action if it requests the data successfully', () => {
    const oldPassword = 'oldPassword';
    const newPassword = 'newPassword';
    const newPasswordConfirm = 'newPassword';

    return expectSaga(authPasswordChangeData)
      .provide({
        getContext: () => ({
          post: url =>
            url === '/auth/password/change'
              ? {
                  data: {
                    oldPassword,
                    newPassword,
                    newPasswordConfirm,
                  },
                }
              : {},
        }),
      })
      .dispatch({
        type: AUTH_PASSWORD_CHANGE_REQUEST,
        payload: {
          oldPassword,
          newPassword,
          newPasswordConfirm,
        },
      })
      .withReducer(authReducer)
      .run();
  });

  it('should dispatch the authPasswordChangeFailure action if it requests the data unsuccessfully', () => {
    const oldPassword = 'oldPassword';
    const newPassword = 'newPassword';
    const newPasswordConfirm = 'newPassword';

    return expectSaga(authPasswordChangeData)
      .dispatch({
        type: AUTH_PASSWORD_CHANGE_REQUEST,
        payload: {
          oldPassword,
          newPassword,
          newPasswordConfirm,
        },
      })
      .withReducer(authReducer)
      .run();
  });
});
