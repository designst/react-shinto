import React from 'react';
import renderer from 'react-test-renderer';
import { StaticRouter } from 'react-router-dom';

import { Home } from '../Home';

describe('<Home />', () => {
  const mock = {};

  const tree = (props, actions) =>
    renderer
      .create(
        <StaticRouter context={{}}>
          <Home {...mock} {...props} {...actions} />
        </StaticRouter>,
      )
      .toJSON();

  test('renders', () => expect(tree).toMatchSnapshot());
});
