import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import './styles.css';

// Export this for unit testing more easily
export class Home extends Component {
  render() {
    return (
      <div
        className="Home"
      >
        Home
      </div>
    );
  }
}

const connector = connect(
  ({ home }) => ({ home }),
);

// Enable hot reloading for async component
export default compose(hot(module), withRouter, connector)(Home);
