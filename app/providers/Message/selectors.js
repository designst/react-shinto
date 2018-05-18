import { createSelector } from 'reselect';

export const selectMessageDomain = state => state.message;

export const makeSelectMessages = () => createSelector(selectMessageDomain, messages => messages);
