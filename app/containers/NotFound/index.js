import React from 'react';
import Helmet from 'react-helmet';

import './styles.css';

type Props = { staticContext: Object };

export default ({ staticContext }: Props) => {
  // We have to check if staticContext exists
  // because it will be undefined if rendered through a BrowserRoute
  if (staticContext) staticContext.status = '404'; // eslint-disable-line no-param-reassign

  return (
    <div className="NotFound">
      <Helmet title="Oops" />
      <p>Oops, Page was not found!</p>
    </div>
  );
};
