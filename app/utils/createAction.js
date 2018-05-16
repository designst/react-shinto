import { WAIT_FOR_ACTION, ERROR_ACTION } from 'redux-wait-for-action';

export default (type, waitAction, errorAction) => payload => {
  const action = {
    type,
    payload,
  };

  if (waitAction && errorAction) {
    action[WAIT_FOR_ACTION] = waitAction;
    action[ERROR_ACTION] = errorAction;
  }

  return action;
};
