import React from 'react';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import renderer from 'react-test-renderer';
import { browserHistory, StaticRouter } from 'react-router-dom';

import configureStore from 'utils/configureStore';

import ConnectedLogout from '../index';

describe('<Logout />', () => {
  const store = configureStore(browserHistory, {});
  const tree = renderer
    .create(
      <Provider store={store}>
        <IntlProvider locale="en">
          <StaticRouter context={{}}>
            <ConnectedLogout />
          </StaticRouter>
        </IntlProvider>
      </Provider>,
    )
    .toJSON();

  test('renders', () => {
    expect(tree).toMatchSnapshot();
  });
});
