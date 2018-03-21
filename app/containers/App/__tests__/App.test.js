import React from 'react';
import renderer from 'react-test-renderer';
import { StaticRouter } from 'react-router-dom';

import App from '../index';

describe('<App />', () => {
  test('renders', () => {
    const mockData = {
      route: {},
    };

    const tree = renderer
      .create(
        <StaticRouter context={{}}>
          <App {...mockData} />
        </StaticRouter>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
