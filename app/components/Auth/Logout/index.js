/**
 * Logout
 */

import React from 'react';
import PropTypes from 'prop-types';

class Logout extends React.Component {
  componentDidMount() {
    const { onSubmit } = this.props;

    onSubmit();
  }

  render() {
    return <div className="b-logout">Logout...</div>;
  }
}

Logout.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Logout;
