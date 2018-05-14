/**
 * Password Change Messages
 *
 * This contains all the text for the Password Change component.
 */

import { defineMessages } from 'react-intl';

export default defineMessages({
  action: {
    id: 'app.components.PasswordChange.action',
    defaultMessage: 'Change Password',
  },
  oldPassword: {
    label: {
      id: 'app.components.PasswordChange.oldPassword.label',
      defaultMessage: 'Current Password',
    },
    placeholder: {
      id: 'app.components.PasswordChange.oldPassword.placeholder',
      defaultMessage: 'Password',
    },
    help: {
      id: 'app.components.PasswordChange.oldPassword.help',
      defaultMessage: 'Please enter your current password',
    },
  },
  newPassword: {
    label: {
      id: 'app.components.PasswordChange.newPassword.label',
      defaultMessage: 'New Password',
    },
    placeholder: {
      id: 'app.components.PasswordChange.newPassword.placeholder',
      defaultMessage: 'Password',
    },
    help: {
      id: 'app.components.PasswordChange.newPassword.help',
      defaultMessage: 'Please enter your new password',
    },
  },
  newPasswordConfirm: {
    label: {
      id: 'app.components.PasswordChange.newPasswordConfirm.label',
      defaultMessage: 'Confirm New Password',
    },
    placeholder: {
      id: 'app.components.PasswordChange.newPasswordConfirm.placeholder',
      defaultMessage: 'Password',
    },
    help: {
      id: 'app.components.PasswordChange.newPasswordConfirm.help',
      defaultMessage: 'Please enter your new password again',
    },
  },
});
