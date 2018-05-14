/**
 * Password Reset Confirm Messages
 *
 * This contains all the text for the Password Reset Confirm component.
 */

import { defineMessages } from 'react-intl';

export default defineMessages({
  action: {
    id: 'app.components.PasswordResetConfirm.action',
    defaultMessage: 'Reset Password',
  },
  token: {
    label: {
      id: 'app.components.PasswordResetConfirm.token.label',
      defaultMessage: 'Token',
    },
    placeholder: {
      id: 'app.components.PasswordResetConfirm.token.placeholder',
      defaultMessage: 'Token',
    },
    help: {
      id: 'app.components.PasswordReset.token.help',
      defaultMessage: 'Please enter your token',
    },
  },
});
