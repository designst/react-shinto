import connectedAuthWrapper from 'redux-auth-wrapper/connectedAuthWrapper';
import createLocationHelper from 'redux-auth-wrapper/history4/locationHelper';
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';

import Loading from 'components/Loading';

const locationHelper = createLocationHelper({});

const userIsNotConfirmedDefaults = {
  wrapperDisplayName: 'UserIsNotConfirmed',
  authenticatedSelector: state => state.auth.isConfirmed === false,
};

export const userIsNotConfirmedRedirect = connectedRouterRedirect({
  ...userIsNotConfirmedDefaults,
  redirectPath: '/auth/login',
  allowRedirectBack: false,
});

export const userIsAuthenticatedDefaults = {
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

export const userIsNotAuthenticatedDefaults = {
  wrapperDisplayName: 'UserIsNotAuthenticated',
  // Want to redirect the user when they are done loading and authenticated
  authenticatedSelector: state =>
    state.auth.isAuthenticated === false && state.auth.isAuthenticating === false,
};

export const userIsNotAuthenticated = connectedAuthWrapper(userIsNotAuthenticatedDefaults);

export const userIsNotAuthenticatedRedirect = connectedRouterRedirect({
  ...userIsNotAuthenticatedDefaults,
  redirectPath: /* istanbul ignore next */ (state, ownProps) =>
    locationHelper.getRedirectQueryParam(ownProps) || '/',
  allowRedirectBack: false,
});
