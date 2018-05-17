import {
  userIsNotConfirmedDefaults,
  userIsAuthenticatedDefaults,
  userIsNotAuthenticatedDefaults,
} from '../index';

describe('auth', () => {
  it('should have correct not confirmed defaults', () => {
    const notConfirmedState = { auth: { isConfirmed: false } };

    expect(userIsNotConfirmedDefaults.wrapperDisplayName).toBe('UserIsNotConfirmed');

    const notConfirmedSelector = userIsNotConfirmedDefaults.authenticatedSelector;

    expect(notConfirmedSelector(notConfirmedState)).toBe(true);
  });

  it('should have correct authenticated defaults', () => {
    const authenticatedState = { auth: { isAuthenticated: true } };

    expect(userIsAuthenticatedDefaults.wrapperDisplayName).toBe('UserIsAuthenticated');

    const { authenticatedSelector } = userIsAuthenticatedDefaults;

    expect(authenticatedSelector(authenticatedState)).toBe(true);
  });

  it('should have correct not authenticated defaults', () => {
    const notAuthenticatedState = { auth: { isAuthenticated: false } };

    expect(userIsNotAuthenticatedDefaults.wrapperDisplayName).toBe('UserIsNotAuthenticated');

    const notAuthenticatedSelector = userIsNotAuthenticatedDefaults.authenticatedSelector;

    expect(notAuthenticatedSelector(notAuthenticatedState)).toBe(false);
  });

  it('should have correct authenticating defaults', () => {
    const authenticatingState = { auth: { isAuthenticating: true } };

    expect(userIsAuthenticatedDefaults.wrapperDisplayName).toBe('UserIsAuthenticated');

    const { authenticatingSelector } = userIsAuthenticatedDefaults;

    expect(authenticatingSelector(authenticatingState)).toBe(true);
  });
});
