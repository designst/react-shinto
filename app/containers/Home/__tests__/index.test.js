import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { browserHistory, StaticRouter } from 'react-router-dom';

import configureStore from 'utils/configureStore';

import ConnectedHome from '../index';

describe('<Home />', () => {
  test('renders authenticated', () => {
    const store = configureStore(browserHistory, {
      auth: {
        isAuthenticated: true,
      },
    });

    const tree = renderer
      .create(
        <Provider store={store}>
          <StaticRouter context={{}}>
            <ConnectedHome />
          </StaticRouter>
        </Provider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('renders not authenticated', () => {
    const store = configureStore(browserHistory, {});

    const tree = renderer
      .create(
        <Provider store={store}>
          <StaticRouter context={{}}>
            <ConnectedHome />
          </StaticRouter>
        </Provider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('renders not authenticated', () => {
    const store = configureStore(browserHistory, {});

    const tree = renderer
      .create(
        <Provider store={store}>
          <StaticRouter context={{}}>
            <ConnectedHome api={jest.fn()} />
          </StaticRouter>
        </Provider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
