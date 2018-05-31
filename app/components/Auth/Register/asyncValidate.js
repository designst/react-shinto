import isEmpty from 'lodash/fp/isEmpty';

import { registerValidateRequest } from 'containers/Auth/Register/actions';

const asyncValidate = (values, dispatch) =>
  new Promise((resolve, reject) =>
    dispatch(
      registerValidateRequest({
        email: values.email,
        username: values.username,
      }),
    ).then(response => {
      const { validateFailure } = response.payload.data;

      if (isEmpty(validateFailure)) {
        resolve();
      } else {
        reject(validateFailure);
      }
    }),
  );

export default asyncValidate;
