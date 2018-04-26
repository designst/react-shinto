import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import './styles.css';

// Export this for unit testing more easily
export class Home extends React.Component {
  render() {
    return <div className="Home">Home</div>;
  }
}

const connector = connect(({ home }) => ({ home }));

// Enable hot reloading for async component
export default compose(withRouter, connector)(Home);
