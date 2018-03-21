import React from 'react';
import renderer from 'react-test-renderer';
import { StaticRouter } from 'react-router-dom';

import NotFound from '../index';

describe('<NotFound />', () => {
  const mockData = {};

  const tree = renderer
    .create(
      <StaticRouter context={{}}>
        <NotFound {...mockData} />
      </StaticRouter>,
    )
    .toJSON();

  test('renders', () => {
    expect(tree).toMatchSnapshot();
  });
});
