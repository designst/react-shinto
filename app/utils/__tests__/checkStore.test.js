/**
 * Test injectors
 */

import checkStore from '../checkStore';

describe('checkStore', () => {
  let store;

  beforeEach(() => {
    store = {
      runSaga: () => {},
      getState: () => {},
      dispatch: () => {},
      subscribe: () => {},
      injectedSagas: {},
      injectedModels: {},
      replaceReducer: () => {},
      injectedReducers: {},
      initialStateReducers: {},
    };
  });

  it('should not throw if passed valid store shape', () => {
    expect(() => checkStore(store)).not.toThrow();
  });

  it('should throw if passed invalid store shape', () => {
    expect(() => checkStore({})).toThrow();
    expect(() => checkStore({ ...store, runSaga: null })).toThrow();
    expect(() => checkStore({ ...store, injectedSagas: null })).toThrow();
    expect(() => checkStore({ ...store, injectedModels: null })).toThrow();
    expect(() => checkStore({ ...store, replaceReducer: null })).toThrow();
    expect(() => checkStore({ ...store, injectedReducers: null })).toThrow();
    expect(() => checkStore({ ...store, initialStateReducers: null })).toThrow();
  });
});
