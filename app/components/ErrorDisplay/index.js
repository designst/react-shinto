/* @flow */

import React from 'react';

import './styles.css';

type Props = { error: Object };

export default ({ error }: Props) => (
  <div className="Error">
    <p>Oops! {error.message}</p>
  </div>
);
