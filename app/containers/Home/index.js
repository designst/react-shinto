import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { createStructuredSelector } from 'reselect';

import { authApiRequest } from 'containers/Auth/actions';
import { logoutRequest } from 'containers/Auth/Logout/actions';
import { makeSelectIsAuthenticated } from 'containers/Auth/selectors';

import Button from 'material-ui/Button';

import './styles.css';

// Export this for unit testing more easily
export class Home extends React.Component {
  render() {
    const { api, logout, isAuthenticated } = this.props;

    return (
      <div className="Home">
        <Button
          style={{
            margin: 10,
          }}
          color="secondary"
          variant="raised"
          margin="normal"
          onClick={/* istanbul ignore next */ () => api()}
        >
          API
        </Button>
        {isAuthenticated && (
          <Button
            style={{
              margin: 10,
            }}
            color="primary"
            variant="raised"
            margin="normal"
            onClick={/* istanbul ignore next */ () => logout()}
          >
            Logout
          </Button>
        )}
      </div>
    );
  }
}

Home.propTypes = {
  api: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isAuthenticated: makeSelectIsAuthenticated(),
});

const mapDispatchToProps = {
  api: authApiRequest,
  logout: logoutRequest,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default compose(withRouter, connector)(Home);
