import createConstant from 'utils/createConstant';

export const AUTH_REGISTER_REQUEST = createConstant(__filename, 'AUTH_REGISTER_REQUEST');
export const AUTH_REGISTER_SUCCESS = createConstant(__filename, 'AUTH_REGISTER_SUCCESS');
export const AUTH_REGISTER_FAILURE = createConstant(__filename, 'AUTH_REGISTER_FAILURE');

export const AUTH_REGISTER_VALIDATE_REQUEST = createConstant(
  __filename,
  'AUTH_REGISTER_VALIDATE_REQUEST',
);
export const AUTH_REGISTER_VALIDATE_SUCCESS = createConstant(
  __filename,
  'AUTH_REGISTER_VALIDATE_SUCCESS',
);
export const AUTH_REGISTER_VALIDATE_FAILURE = createConstant(
  __filename,
  'AUTH_REGISTER_VALIDATE_FAILURE',
);
