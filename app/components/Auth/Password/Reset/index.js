/**
 * Password Reset
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';

import PasswordResetForm from './form';

const PasswordReset = ({ onSubmit }) => (
  <div className="b-password-reset">
    <PasswordResetForm onSubmit={onSubmit} />

    <Link to="/auth/login">
      <Button type="link">Login</Button>
    </Link>
  </div>
);

PasswordReset.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default PasswordReset;
