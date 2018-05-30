/**
 * Register
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import Button from '@material-ui/core/Button';

import RegisterForm from './form';
import messages from './messages';

const Register = ({ onSubmit }) => (
  <div className="b-register">
    <FormattedMessage {...messages.header} />

    <RegisterForm onSubmit={onSubmit} />

    <Link to="/auth/login">
      <Button type="link">Login</Button>
    </Link>
  </div>
);

Register.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Register;
