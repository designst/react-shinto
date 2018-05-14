import React from 'react';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import renderer from 'react-test-renderer';
import { browserHistory, StaticRouter } from 'react-router-dom';

import configureStore from 'utils/configureStore';

import ConnectedPasswordResetConfirm from '../index';

describe('<PasswordResetConfirm />', () => {
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
            <ConnectedPasswordResetConfirm {...mockData} />
          </StaticRouter>
        </IntlProvider>
      </Provider>,
    )
    .toJSON();

  test('renders', () => {
    expect(tree).toMatchSnapshot();
  });
});
