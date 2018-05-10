import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { browserHistory, StaticRouter } from 'react-router-dom';

import configureStore from 'utils/configureStore';

import ConnectedAuth from '../index';

describe('<Auth />', () => {
  const mockData = {
    route: {},
  };
  const store = configureStore(browserHistory, {});
  const tree = renderer
    .create(
      <Provider store={store}>
        <StaticRouter context={{}}>
          <ConnectedAuth {...mockData} />
        </StaticRouter>
      </Provider>,
    )
    .toJSON();

  test('renders', () => {
    expect(tree).toMatchSnapshot();
  });
});
