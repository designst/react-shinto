import invariant from 'invariant';
import isObject from 'lodash/isObject';
import conformsTo from 'lodash/conformsTo';
import isFunction from 'lodash/isFunction';

/**
 * Validate the shape of redux store
 */
export default function checkStore(store) {
  const shape = {
    dispatch: isFunction,
    subscribe: isFunction,
    getState: isFunction,
    replaceReducer: isFunction,
    runSaga: isFunction,
    initialStateReducers: isObject,
    injectedModels: isObject,
    injectedReducers: isObject,
    injectedSagas: isObject,
  };
  invariant(conformsTo(store, shape), '(app/utils...) injectors: Expected a valid redux store');
}
