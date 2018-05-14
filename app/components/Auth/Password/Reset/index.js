/**
 * Password Reset
 */

import React from 'react';
import PropTypes from 'prop-types';

import PasswordResetForm from './form';

const PasswordReset = ({ onSubmit }) => (
  <div className="b-password-reset">
    <PasswordResetForm onSubmit={onSubmit} />
  </div>
);

PasswordReset.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default PasswordReset;
