import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { IntlProvider } from 'react-intl';
import { browserHistory, StaticRouter } from 'react-router-dom';

import configureStore from 'utils/configureStore';

import LoadableRegisterConfirm from '../loadable';

describe('<LoadableRegisterConfirm />', () => {
  const mockData = {
    match: {
      params: {
        token: 'token',
      },
    },
  };

  const store = configureStore(browserHistory, {});
  const tree = renderer
    .create(
      <Provider store={store}>
        <IntlProvider locale="en">
          <StaticRouter context={{}}>
            <LoadableRegisterConfirm {...mockData} />
          </StaticRouter>
        </IntlProvider>
      </Provider>,
    )
    .toJSON();

  test('renders', () => {
    expect(tree).toMatchSnapshot();
  });
});
