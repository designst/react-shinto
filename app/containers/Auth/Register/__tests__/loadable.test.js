import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { browserHistory, StaticRouter } from 'react-router-dom';

import configureStore from 'utils/configureStore';

import LoadableRegister from '../loadable';

describe('<LoadableHome />', () => {
  const store = configureStore(browserHistory, {});
  const tree = renderer
    .create(
      <Provider store={store}>
        <StaticRouter context={{}}>
          <LoadableRegister />
        </StaticRouter>
      </Provider>,
    )
    .toJSON();

  test('renders', () => {
    expect(tree).toMatchSnapshot();
  });
});
