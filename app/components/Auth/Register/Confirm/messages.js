/**
 * Register Confirm Messages
 *
 * This contains all the text for the Register Confirm component.
 */

import { defineMessages } from 'react-intl';

export default defineMessages({
  header: {
    id: 'app.components.Register.Confirm.header',
    defaultMessage: 'Confirm your registration',
  },
  action: {
    id: 'app.components.Register.Confirm.action',
    defaultMessage: 'Register',
  },
  token: {
    label: {
      id: 'app.components.Register.Confirm.token.label',
      defaultMessage: 'Token',
    },
    placeholder: {
      id: 'app.components.Register.Confirm.token.placeholder',
      defaultMessage: 'Token',
    },
    help: {
      id: 'app.components.Register.Confirm.token.help',
      defaultMessage: 'Please enter your token',
    },
  },
});
