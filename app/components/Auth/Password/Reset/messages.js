/**
 * Password Reset Messages
 *
 * This contains all the text for the Password Reset component.
 */

import { defineMessages } from 'react-intl';

export default defineMessages({
  action: {
    id: 'app.components.PasswordReset.action',
    defaultMessage: 'Reset Password',
  },
  email: {
    label: {
      id: 'app.components.PasswordReset.email.label',
      defaultMessage: 'E-Mail',
    },
    placeholder: {
      id: 'app.components.PasswordReset.email.placeholder',
      defaultMessage: 'E-Mail',
    },
    help: {
      id: 'app.components.PasswordReset.email.help',
      defaultMessage: 'Please enter your email',
    },
  },
  username: {
    label: {
      id: 'app.components.PasswordReset.username.label',
      defaultMessage: 'Username',
    },
    placeholder: {
      id: 'app.components.PasswordReset.username.placeholder',
      defaultMessage: 'Username',
    },
    help: {
      id: 'app.components.PasswordReset.username.help',
      defaultMessage: 'Please enter your username',
    },
  },
});
