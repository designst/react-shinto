import React from 'react';
import renderer from 'react-test-renderer';
import { StaticRouter } from 'react-router-dom';

import Auth from '../index';

describe('<Auth />', () => {
  test('renders', () => {
    const mockData = {
      route: {},
    };

    const tree = renderer
      .create(
        <StaticRouter context={{}}>
          <Auth {...mockData} />
        </StaticRouter>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
