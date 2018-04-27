import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { StaticRouter } from 'react-router-dom';

import NotFound from '../index';

describe('<NotFound />', () => {
  test('renders', () => {
    const tree = renderer
      .create(
        <StaticRouter context={{}}>
          <NotFound />
        </StaticRouter>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should not have a staticContext', () => {
    const renderedComponent = mount(<NotFound />);

    expect(renderedComponent.prop('staticContext')).toBeUndefined();
  });

  it('should have a staticContext', () => {
    const renderedComponent = mount(<NotFound staticContext={{}} />);

    expect(renderedComponent.props().staticContext).toEqual({
      status: '404',
    });
  });
});
