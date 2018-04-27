/**
 * Test injectors
 */

import React from 'react';
import { shallow } from 'enzyme';
import { memoryHistory } from 'react-router-dom';

import injectModels from '../injectModels';
import configureStore from '../configureStore';

import * as modelInjectors from '../modelInjectors';

// Fixtures
const Component = () => null;

const models = {
  model: {
    name: 'testModel',
  },
};

describe('injectModels decorator', () => {
  let store;
  let injectors;
  let ComponentWithModel;

  beforeAll(() => {
    modelInjectors.default = jest.fn().mockImplementation(() => injectors);
  });

  beforeEach(() => {
    store = configureStore(memoryHistory, {});
    injectors = {
      injectModels: jest.fn(),
    };
    ComponentWithModel = injectModels(models)(Component);
    modelInjectors.default.mockClear();
  });

  it('should inject given models', () => {
    shallow(<ComponentWithModel />, { context: { store } });

    expect(injectors.injectModels).toHaveBeenCalledTimes(1);
    expect(injectors.injectModels).toHaveBeenCalledWith(models);
  });

  it('should set a correct display name', () => {
    expect(ComponentWithModel.displayName).toBe('withModels(Component)');
    expect(injectModels(models)(() => null).displayName).toBe('withModels(Component)');
  });
});
