import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { IntlProvider } from 'react-intl';
import { StaticRouter, memoryHistory } from 'react-router-dom';

import configureStore from 'utils/configureStore';

import Login from '../index';

describe('<Login />', () => {
  test('renders', () => {
    const store = configureStore(memoryHistory, {});
    const tree = renderer
      .create(
        <Provider store={store}>
          <IntlProvider locale="en">
            <StaticRouter context={{}}>
              <Login onSubmit={jest.fn()} />
            </StaticRouter>
          </IntlProvider>
        </Provider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
