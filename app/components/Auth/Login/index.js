/**
 * Login
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import LoginForm from './form';
import messages from './messages';

const Login = ({ onSubmit }) => (
  <div className="b-login">
    <FormattedMessage {...messages.header} />

    <LoginForm onSubmit={onSubmit} />
  </div>
);

Login.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Login;
