/**
 * Register Messages
 *
 * This contains all the text for the Register component.
 */

import { defineMessages } from 'react-intl';

export default defineMessages({
  header: {
    id: 'app.components.Register.header',
    defaultMessage: 'This is the Register component!',
  },
  action: {
    id: 'app.components.Register.action',
    defaultMessage: 'Register',
  },
  username: {
    label: {
      id: 'app.components.Register.username.label',
      defaultMessage: 'Username',
    },
    placeholder: {
      id: 'app.components.Register.username.placeholder',
      defaultMessage: 'Username',
    },
    help: {
      id: 'app.components.Register.username.help',
      defaultMessage: 'Please enter your username',
    },
  },
  email: {
    label: {
      id: 'app.components.Register.email.label',
      defaultMessage: 'E-Mail',
    },
    placeholder: {
      id: 'app.components.Register.email.placeholder',
      defaultMessage: 'E-Mail',
    },
    help: {
      id: 'app.components.Register.email.help',
      defaultMessage: 'Please enter your email',
    },
  },
  password: {
    label: {
      id: 'app.components.Register.password.label',
      defaultMessage: 'Password',
    },
    placeholder: {
      id: 'app.components.Register.password.placeholder',
      defaultMessage: 'Password',
    },
    help: {
      id: 'app.components.Register.password.help',
      defaultMessage: 'Please enter your password',
    },
  },
  passwordConfirm: {
    label: {
      id: 'app.components.Register.passwordConfirm.label',
      defaultMessage: 'Confirm Password',
    },
    placeholder: {
      id: 'app.components.Register.passwordConfirm.placeholder',
      defaultMessage: 'Password',
    },
    help: {
      id: 'app.components.Register.passwordConfirm.help',
      defaultMessage: 'Please enter your password again',
    },
  },
});
