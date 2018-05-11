import { makeSelectToken, makeSelectIsAuthenticated } from '../selectors';

describe('Auth Selectors', () => {
  it('should select token', () => {
    const token = 'token';

    const state = {
      auth: {
        token,
      },
    };

    const selector = makeSelectToken();

    expect(selector(state)).toEqual(token);
  });

  it('should select isAuthenticated', () => {
    const isAuthenticated = true;

    const state = {
      auth: {
        isAuthenticated,
      },
    };

    const selector = makeSelectIsAuthenticated();

    expect(selector(state)).toEqual(isAuthenticated);
  });
});
