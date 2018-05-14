import { expectSaga } from 'redux-saga-test-plan';

import authReducer from 'containers/Auth/reducer';
import authRegisterData from 'containers/Auth/Register/saga';
import { AUTH_REGISTER_REQUEST } from 'containers/Auth/Register/constants';

describe('authRegisterData', () => {
  let authRegisterGenerator;

  beforeEach(() => {
    authRegisterGenerator = authRegisterData();

    const selectDescriptor = authRegisterGenerator.next().value;
    expect(selectDescriptor).toMatchSnapshot();
  });

  it('should dispatch the authRegisterSuccess action if it requests the data successfully', () => {
    const token = 'token';

    const email = 'email@email.com';
    const username = 'username';
    const password = 'password';

    return expectSaga(authRegisterData)
      .provide({
        getContext: () => ({
          post: url =>
            url === '/auth/register'
              ? {
                  data: {
                    token,
                    email,
                    username,
                  },
                }
              : {},
        }),
      })
      .dispatch({
        type: AUTH_REGISTER_REQUEST,
        payload: {
          email,
          username,
          password,
          passwordConfirm: password,
        },
      })
      .withReducer(authReducer)
      .run();
  });

  it('should dispatch the authRegisterFailure action if it requests the data unsuccessfully', () => {
    const email = 'email@email.com';
    const username = 'username';
    const password = 'password';

    return expectSaga(authRegisterData)
      .dispatch({
        type: AUTH_REGISTER_REQUEST,
        payload: {
          email,
          username,
          password,
          passwordConfirm: password,
        },
      })
      .withReducer(authReducer)
      .run();
  });
});
