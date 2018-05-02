import connectedAuthWrapper from 'redux-auth-wrapper/connectedAuthWrapper';
import createLocationHelper from 'redux-auth-wrapper/history4/locationHelper';
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';

import Loading from 'components/Loading';

const locationHelper = createLocationHelper({});

const userIsAuthenticatedDefaults = {
  wrapperDisplayName: 'UserIsAuthenticated',
  authenticatedSelector: state => state.auth.isAuthenticated,
  authenticatingSelector: state => state.auth.isAuthenticating,
};

export const userIsAuthenticated = connectedAuthWrapper(userIsAuthenticatedDefaults);

export const userIsAuthenticatedRedirect = connectedRouterRedirect({
  ...userIsAuthenticatedDefaults,
  redirectPath: '/auth/login',
  AuthenticatingComponent: Loading,
});

const userIsNotAuthenticatedDefaults = {
  wrapperDisplayName: 'UserIsNotAuthenticated',
  // Want to redirect the user when they are done loading and authenticated
  authenticatedSelector: state =>
    state.auth.isAuthenticated === false && state.auth.isAuthenticating === false,
};

export const userIsNotAuthenticated = connectedAuthWrapper(userIsNotAuthenticatedDefaults);

export const userIsNotAuthenticatedRedirect = connectedRouterRedirect({
  ...userIsNotAuthenticatedDefaults,
  redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/',
  allowRedirectBack: false,
});
