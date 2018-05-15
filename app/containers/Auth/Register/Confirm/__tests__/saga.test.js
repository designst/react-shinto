import { expectSaga } from 'redux-saga-test-plan';

import authReducer from 'containers/Auth/reducer';
import authRegisterConfirmData from 'containers/Auth/Register/Confirm/saga';
import { AUTH_REGISTER_CONFIRM_REQUEST } from 'containers/Auth/Register/Confirm/constants';

describe('authRegisterConfirmData', () => {
  let authRegisterConfirmGenerator;

  beforeEach(() => {
    authRegisterConfirmGenerator = authRegisterConfirmData();

    const selectDescriptor = authRegisterConfirmGenerator.next().value;
    expect(selectDescriptor).toMatchSnapshot();
  });

  it('should dispatch the authRegisterConfirmSuccess action if it requests the data successfully', () => {
    const token = 'confirm';

    return expectSaga(authRegisterConfirmData)
      .provide({
        getContext: () => ({
          post: url =>
            url === '/auth/register/confirm'
              ? {
                  data: {
                    token,
                  },
                }
              : {},
        }),
      })
      .dispatch({
        type: AUTH_REGISTER_CONFIRM_REQUEST,
        payload: {
          token,
        },
      })
      .withReducer(authReducer)
      .run();
  });

  it('should dispatch the authRegisterConfirmFailure action if it requests the data unsuccessfully', () => {
    const token = 'confirm';

    return expectSaga(authRegisterConfirmData)
      .dispatch({
        type: AUTH_REGISTER_CONFIRM_REQUEST,
        payload: {
          token,
        },
      })
      .withReducer(authReducer)
      .run();
  });
});
