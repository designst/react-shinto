import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { injectIntl, FormattedMessage } from 'react-intl';

import Button from '@material-ui/core/Button';
import { TextField } from 'redux-form-material-ui';

import messages from './messages';

const PasswordChangeForm = ({ intl, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <Field
      fullWidth
      name="oldPassword"
      type="password"
      label={intl.formatMessage(messages.oldPassword.label)}
      margin="normal"
      component={TextField}
      helperText={intl.formatMessage(messages.oldPassword.help)}
      placeholder={intl.formatMessage(messages.oldPassword.placeholder)}
    />

    <Field
      fullWidth
      name="newPassword"
      type="password"
      label={intl.formatMessage(messages.newPassword.label)}
      margin="normal"
      component={TextField}
      helperText={intl.formatMessage(messages.newPassword.help)}
      placeholder={intl.formatMessage(messages.newPassword.placeholder)}
    />

    <Field
      fullWidth
      name="newPasswordConfirm"
      type="password"
      label={intl.formatMessage(messages.newPasswordConfirm.label)}
      margin="normal"
      component={TextField}
      helperText={intl.formatMessage(messages.newPasswordConfirm.help)}
      placeholder={intl.formatMessage(messages.newPasswordConfirm.placeholder)}
    />

    <Button type="submit" color="primary" variant="raised">
      <FormattedMessage {...messages.action} />
    </Button>
  </form>
);

PasswordChangeForm.propTypes = {
  intl: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

const withIntl = injectIntl(PasswordChangeForm);

export default reduxForm({
  form: 'passwordChange',
})(withIntl);
