import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { browserHistory, StaticRouter } from 'react-router-dom';

import configureStore from 'utils/configureStore';

import ConnectedLogin from '../index';

describe('<Login />', () => {
  const store = configureStore(browserHistory, {});
  const tree = renderer
    .create(
      <Provider store={store}>
        <StaticRouter context={{}}>
          <ConnectedLogin />
        </StaticRouter>
      </Provider>,
    )
    .toJSON();

  test('renders', () => {
    expect(tree).toMatchSnapshot();
  });
});
