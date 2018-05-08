import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { createStructuredSelector } from 'reselect';

import { logoutRequest } from 'containers/Auth/Logout/actions';
import { makeSelectIsAuthenticated } from 'containers/Auth/selectors';

import Button from 'material-ui/Button';

import './styles.css';

// Export this for unit testing more easily
export class Home extends React.Component {
  render() {
    const { logout, isAuthenticated } = this.props;

    return (
      <div className="Home">
        {isAuthenticated && (
          <Button color="primary" variant="raised" onClick={() => logout()}>
            Logout
          </Button>
        )}
      </div>
    );
  }
}

Home.propTypes = {
  logout: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isAuthenticated: makeSelectIsAuthenticated(),
});

const mapDispatchToProps = {
  logout: logoutRequest,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

// Enable hot reloading for async component
export default compose(withRouter, connector)(Home);
