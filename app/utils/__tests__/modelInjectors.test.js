/**
 * Test injectors
 */

import { memoryHistory } from 'react-router-dom';

import configureStore from '../configureStore';
import getInjectors, { injectModelsFactory } from '../modelInjectors';

describe('modelInjectors', () => {
  let store;
  let injectModels;

  const reducers = {
    setTrue: () => true,
    setFalse: () => false,
  };

  const model1 = {
    state: false,
    reducers,
  };

  const model2 = {
    state: false,
    reducers,
  };

  const models = {
    model1,
    model2,
  };

  describe('getInjectors', () => {
    beforeEach(() => {
      store = configureStore(memoryHistory, {});
    });

    it('should return injectors', () => {
      expect(getInjectors(store)).toEqual(
        expect.objectContaining({
          injectModels: expect.any(Function),
        }),
      );
    });

    it('should throw if passed invalid store shape', () => {
      Reflect.deleteProperty(store, 'dispatch');

      expect(() => getInjectors(store)).toThrow();
    });
  });

  describe('injectModels helper', () => {
    beforeEach(() => {
      store = configureStore(memoryHistory, {});
      injectModels = injectModelsFactory(store, true);
    });

    it('should check a store if the second argument is falsy', () => {
      const inject = injectModelsFactory({});

      expect(() => inject(models)).toThrow();
    });

    it('should not check a store if the second argument is true', () => {
      Reflect.deleteProperty(store, 'dispatch');

      expect(() => injectModels(models)).not.toThrow();
    });
  });
});
