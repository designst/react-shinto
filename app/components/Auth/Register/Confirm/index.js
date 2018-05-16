/**
 * Register Confirm
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import RegisterConfirmForm from './form';
import messages from './messages';

const RegisterConfirm = ({ token, onSubmit }) => (
  <div className="b-register-confirm">
    <FormattedMessage {...messages.header} />

    <RegisterConfirmForm onSubmit={onSubmit} initialValues={{ token }} />
  </div>
);

RegisterConfirm.propTypes = {
  token: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
};

RegisterConfirm.defaultProps = {
  token: '',
};

export default RegisterConfirm;
