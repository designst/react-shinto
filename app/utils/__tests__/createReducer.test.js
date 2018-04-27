import fp from 'lodash/fp';
import createReducer, { createModelReducers } from '../createReducer';

describe('createReducer', () => {
  let injectedModels;
  let injectedReducers;
  let initialStateReducers;

  const rootReducer = {
    auth: expect.any(Object),
    route: expect.any(Object),
    global: expect.any(Object),
    language: expect.any(Object),
  };

  beforeEach(() => {
    injectedModels = {};
    injectedReducers = {};
    initialStateReducers = {};
  });

  it('should create the default reducer', () => {
    const reducer = createReducer(injectedModels, injectedReducers, initialStateReducers);

    expect(reducer({}, {})).toEqual(rootReducer);
  });

  it('should create the reducer with injected models', () => {
    injectedModels = {
      model: {
        state: { test: 'injected' },
        reducers: {},
        effects: {},
      },
    };

    const reducer = createReducer(injectedModels, injectedReducers, initialStateReducers);

    expect(reducer({}, {})).toEqual({
      ...rootReducer,
      model: {
        test: 'injected',
      },
    });
  });

  it('should create the reducer with injected reducers', () => {
    injectedReducers = {
      testReducer: (state = { test: 'injected' }) => state,
    };

    const reducer = createReducer(injectedModels, injectedReducers, initialStateReducers);

    expect(reducer({}, {})).toEqual({
      ...rootReducer,
      testReducer: {
        test: 'injected',
      },
    });
  });

  it('should create the reducer with initial state reducers', () => {
    initialStateReducers = {
      testReducer: (state = { test: 'initialState' }) => state,
    };

    const reducer = createReducer(injectedModels, injectedReducers, initialStateReducers);

    expect(reducer({}, {})).toEqual({
      ...rootReducer,
      testReducer: {
        test: 'initialState',
      },
    });
  });
});

describe('createModelReducer', () => {
  it('should handle the injected model reducer', () => {
    const models = {
      model: {
        state: { count: 0 },
        reducers: {
          reducer: (state, payload) =>
            fp.assign(state, {
              data: payload.data,
              count: state.count + 1,
            }),
        },
      },
    };

    const modelReducers = createModelReducers(models);

    const state = { count: 0 };
    const action = { type: 'model/reducer', payload: { data: 'payload' } };

    expect(modelReducers.model(state, action)).toEqual({
      data: 'payload',
      count: 1,
    });
  });
});
