import Debug from 'debug';
import React from 'react';
import PropTypes from 'prop-types';
import hoistNonReactStatics from 'hoist-non-react-statics';

import getInjectors from './modelInjectors';

const debug = new Debug('shinto:utils:inject-models');

/**
 * Dynamically injects models
 *
 * @param {object} models Models that will be injected
 *
 */
export default models => WrappedComponent => {
  class ModelInjector extends React.Component {
    static WrappedComponent = WrappedComponent;
    static contextTypes = {
      store: PropTypes.object.isRequired,
    };
    static displayName = `withModels(${WrappedComponent.displayName ||
      WrappedComponent.name ||
      'Component'})`;

    componentWillMount() {
      const { injectModels } = this.injectors;

      debug('Inject Component Models');

      injectModels(models);
    }

    injectors = getInjectors(this.context.store);

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return hoistNonReactStatics(ModelInjector, WrappedComponent);
};
