import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { browserHistory, StaticRouter } from 'react-router-dom';

import configureStore from 'utils/configureStore';

import ConnectedRegister from '../index';

describe('<Login />', () => {
  const store = configureStore(browserHistory, {});
  const tree = renderer
    .create(
      <Provider store={store}>
        <StaticRouter context={{}}>
          <ConnectedRegister />
        </StaticRouter>
      </Provider>,
    )
    .toJSON();

  test('renders', () => {
    expect(tree).toMatchSnapshot();
  });
});
