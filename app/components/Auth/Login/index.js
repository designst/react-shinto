/**
 * Login
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import Button from '@material-ui/core/Button';

import LoginForm from './form';
import messages from './messages';

const Login = ({ onSubmit }) => (
  <div className="b-login">
    <FormattedMessage {...messages.header} />

    <LoginForm onSubmit={onSubmit} />

    <Link to="/auth/register">
      <Button type="link">Register</Button>
    </Link>

    <Link to="/auth/password/reset">
      <Button type="link">Password Reset</Button>
    </Link>
  </div>
);

Login.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Login;
