/**
 * Password Change
 */

import React from 'react';
import PropTypes from 'prop-types';

import PasswordChangeForm from './form';

const PasswordChange = ({ onSubmit }) => (
  <div className="b-password-change">
    <PasswordChangeForm onSubmit={onSubmit} />
  </div>
);

PasswordChange.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default PasswordChange;
