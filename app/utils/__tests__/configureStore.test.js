import createHistory from 'history/createBrowserHistory';

import configureStore, { createFakeReducers } from '../configureStore';

const history = createHistory();

global.__DEV__ = true;
global.__CLIENT__ = true;

describe('configureStore', () => {
  let store;

  beforeAll(() => {
    store = configureStore(history, {});
  });

  describe('runSaga', () => {
    it('should contain a hook for `sagaMiddleware.run`', () => {
      expect(typeof store.runSaga).toBe('function');
    });
  });

  describe('injectedSagas', () => {
    it('should contain an object for sagas', () => {
      expect(typeof store.injectedSagas).toBe('object');
    });
  });

  describe('injectedModels', () => {
    it('should contain an object for models', () => {
      expect(typeof store.injectedModels).toBe('object');
    });
  });

  describe('injectedReducers', () => {
    it('should contain an object for reducers', () => {
      expect(typeof store.injectedReducers).toBe('object');
    });
  });

  describe('initialStateReducers', () => {
    it('should contain an object for initial state reducers', () => {
      expect(typeof store.initialStateReducers).toBe('object');
    });
  });
});

describe('createFakeReducers', () => {
  it('should handle a default state', () => {
    expect(createFakeReducers({})).toEqual({});
  });

  it('should have a fake reducer for initial state', () => {
    let state = {
      auth: jest.fn(),
      fake: undefined,
    };

    expect(typeof state.auth).toBe('function');
    expect(typeof state.fake).toBe('undefined');

    state = createFakeReducers(state);

    expect(typeof state.fake).toBe('function');

    const fakeState = { fake: 'fake' };

    expect(state.fake()).toEqual({});
    expect(state.fake(fakeState)).toBe(fakeState);
  });
});
