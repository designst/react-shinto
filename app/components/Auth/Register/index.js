/**
 * Register
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import RegisterForm from './form';
import messages from './messages';

const Register = ({ onSubmit }) => (
  <div className="b-register">
    <FormattedMessage {...messages.header} />

    <RegisterForm onSubmit={onSubmit} />
  </div>
);

Register.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Register;
