/**
 * Password Reset Confirm
 */

import React from 'react';
import PropTypes from 'prop-types';

import PasswordResetConfirmForm from './form';

const PasswordResetConfirm = props => (
  <div className="b-password-reset-confirm">
    <PasswordResetConfirmForm {...props} />
  </div>
);

PasswordResetConfirm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default PasswordResetConfirm;
