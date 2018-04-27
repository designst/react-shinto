import invariant from 'invariant';
import isObject from 'lodash/isObject';
import conformsTo from 'lodash/conformsTo';
import isFunction from 'lodash/isFunction';

/**
 * Validate the shape of redux store
 */
export default function checkStore(store) {
  const shape = {
    runSaga: isFunction,
    getState: isFunction,
    dispatch: isFunction,
    subscribe: isFunction,
    injectedSagas: isObject,
    injectedModels: isObject,
    replaceReducer: isFunction,
    injectedReducers: isObject,
    initialStateReducers: isObject,
  };
  invariant(conformsTo(store, shape), '(app/utils...) injectors: Expected a valid redux store');
}
