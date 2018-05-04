import { createSelector } from 'reselect';

const selectAuthDomain = state => state.auth;

export const makeSelectToken = () => createSelector(selectAuthDomain, state => state.token);
