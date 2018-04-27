import Debug from 'debug';

const debug = new Debug('shinto:utils:data-loader');

const dataLoader = ({
  key,
  saga,
  model,
  reducer,
  callback = () => {},
  ignoreAuthentication = false,
}) => ({ store, sagaInjectors, modelInjectors, reducerInjectors }) => {
  const promises = [];

  if (!ignoreAuthentication) {
    // Check if isAuthenticated is true and
    // do not load data if it's not.
    const state = store.getState();
    const { isAuthenticated } = state.auth;

    if (!isAuthenticated) {
      return Promise.all(promises);
    }
  }

  if (saga) {
    promises.push(saga);
  } else {
    promises.push(new Promise(resolve => resolve()));
  }

  if (model) {
    promises.push(model);
  } else {
    promises.push(new Promise(resolve => resolve()));
  }

  if (reducer) {
    promises.push(reducer);
  } else {
    promises.push(new Promise(resolve => resolve()));
  }

  return Promise.all(promises)
    .then(([sagaModule, modelModule, reducerModule]) => {
      if (saga) {
        sagaInjectors.injectSaga(key, { saga: sagaModule.default });
      }

      if (model) {
        modelInjectors.injectModels(modelModule);
      }

      if (reducer) {
        reducerInjectors.injectReducer(key, reducerModule.default);
      }
    })
    .then(callback)
    .catch(debug);
};

export default dataLoader;
