import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { injectIntl, FormattedMessage } from 'react-intl';

import Button from '@material-ui/core/Button';
import { TextField } from 'redux-form-material-ui';

import messages from './messages';

const PasswordResetForm = ({ intl, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <Field
      fullWidth
      name="email"
      type="email"
      label={intl.formatMessage(messages.email.label)}
      margin="normal"
      component={TextField}
      helperText={intl.formatMessage(messages.email.help)}
      placeholder={intl.formatMessage(messages.email.placeholder)}
    />

    <Field
      fullWidth
      name="username"
      label={intl.formatMessage(messages.username.label)}
      margin="normal"
      component={TextField}
      helperText={intl.formatMessage(messages.username.help)}
      placeholder={intl.formatMessage(messages.username.placeholder)}
    />

    <Button type="submit" color="primary" variant="raised">
      <FormattedMessage {...messages.action} />
    </Button>
  </form>
);

PasswordResetForm.propTypes = {
  intl: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

const withIntl = injectIntl(PasswordResetForm);

export default reduxForm({
  form: 'passwordReset',
})(withIntl);
