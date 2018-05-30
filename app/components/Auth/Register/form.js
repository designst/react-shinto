import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { injectIntl, FormattedMessage } from 'react-intl';

import Button from '@material-ui/core/Button';
import { TextField } from 'redux-form-material-ui';

import messages from './messages';

const RegisterForm = ({ intl, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <Field
      required
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

    <Field
      required
      fullWidth
      name="password"
      type="password"
      label={intl.formatMessage(messages.password.label)}
      margin="normal"
      component={TextField}
      helperText={intl.formatMessage(messages.password.help)}
      placeholder={intl.formatMessage(messages.password.placeholder)}
    />

    <Field
      required
      fullWidth
      name="passwordConfirm"
      type="password"
      label={intl.formatMessage(messages.passwordConfirm.label)}
      margin="normal"
      component={TextField}
      helperText={intl.formatMessage(messages.passwordConfirm.help)}
      placeholder={intl.formatMessage(messages.passwordConfirm.placeholder)}
    />

    <Button type="submit" color="primary" variant="raised">
      <FormattedMessage {...messages.action} />
    </Button>
  </form>
);

RegisterForm.propTypes = {
  intl: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

const withIntl = injectIntl(RegisterForm);

export default reduxForm({
  form: 'register',
})(withIntl);
