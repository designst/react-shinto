import Debug from 'debug';

import invariant from 'invariant';
import isEmpty from 'lodash/isEmpty';
import isObject from 'lodash/isObject';

import checkStore from './checkStore';
import createReducer from './createReducer';

const debug = new Debug('shinto:utils:model-injectors');

export function injectModelsFactory(store, isValid) {
  return function injectModels(models) {
    if (!isValid) checkStore(store);

    invariant(
      !isEmpty(models) && isObject(models),
      '(app/utils...) injectReducer: Expected `reducer` to be a reducer function',
    );

    Object.keys(models).forEach(key => {
      debug('Inject Model: %s', key);

      store.injectedModels[key] = models[key];
      // This function triggers an unnecessary replaceReducer call.
      store.model({ name: key, ...models[key] });
    });

    // Trigger again a store.replaceReducer for all the injected models and reducers.
    store.replaceReducer(
      createReducer(store.injectedModels, store.injectedReducers, store.initialStateReducers),
    );
  };
}

export default function getInjectors(store) {
  checkStore(store);

  return {
    injectModels: injectModelsFactory(store, true),
  };
}
