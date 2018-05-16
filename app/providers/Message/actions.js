import { ADD_MESSAGE, DELETE_MESSAGE } from './constants';

export const addMessage = message => ({
  type: ADD_MESSAGE,
  message,
});

export const deleteMessage = id => ({
  type: DELETE_MESSAGE,
  id,
});
