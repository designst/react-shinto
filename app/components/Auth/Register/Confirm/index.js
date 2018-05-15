/**
 * Register Confirm
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import RegisterConfirmForm from './form';
import messages from './messages';

const RegisterConfirm = props => (
  <div className="b-register-confirm">
    <FormattedMessage {...messages.header} />

    <RegisterConfirmForm {...props} />
  </div>
);

RegisterConfirm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default RegisterConfirm;
