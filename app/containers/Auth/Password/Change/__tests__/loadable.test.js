import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { IntlProvider } from 'react-intl';
import { browserHistory, StaticRouter } from 'react-router-dom';

import configureStore from 'utils/configureStore';

import LoadablePasswordChange from '../loadable';

describe('<LoadablePasswordChange />', () => {
  const store = configureStore(browserHistory, {});
  const tree = renderer
    .create(
      <Provider store={store}>
        <IntlProvider locale="en">
          <StaticRouter context={{}}>
            <LoadablePasswordChange />
          </StaticRouter>
        </IntlProvider>
      </Provider>,
    )
    .toJSON();

  test('renders', () => {
    expect(tree).toMatchSnapshot();
  });
});
