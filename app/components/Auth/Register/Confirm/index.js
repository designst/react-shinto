/**
 * Register Confirm
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import Typography from '@material-ui/core/Typography';

import RegisterConfirmForm from './form';
import messages from './messages';

const RegisterConfirm = ({ token, onSubmit }) => (
  <div className="b-register-confirm">
    <Typography variant="headline">
      <FormattedMessage {...messages.header} />
    </Typography>

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
