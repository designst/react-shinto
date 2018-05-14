import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { IntlProvider } from 'react-intl';
import { browserHistory, StaticRouter } from 'react-router-dom';

import configureStore from 'utils/configureStore';

import LoadablePasswordResetConfirm from '../loadable';

describe('<LoadablePasswordResetConfirm />', () => {
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
            <LoadablePasswordResetConfirm {...mockData} />
          </StaticRouter>
        </IntlProvider>
      </Provider>,
    )
    .toJSON();

  test('renders', () => {
    expect(tree).toMatchSnapshot();
  });
});
