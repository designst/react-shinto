/**
 * Login Messages
 *
 * This contains all the text for the Login component.
 */

import { defineMessages } from 'react-intl';

export default defineMessages({
  header: {
    id: 'app.components.Login.header',
    defaultMessage: 'This is the Login component!',
  },
  action: {
    id: 'app.components.Login.action',
    defaultMessage: 'Login',
  },
  username: {
    label: {
      id: 'app.components.Login.username.label',
      defaultMessage: 'Username',
    },
    placeholder: {
      id: 'app.components.Login.username.placeholder',
      defaultMessage: 'Username',
    },
    help: {
      id: 'app.components.Login.username.help',
      defaultMessage: 'Please enter your username',
    },
  },
  password: {
    label: {
      id: 'app.components.Login.password.label',
      defaultMessage: 'Password',
    },
    placeholder: {
      id: 'app.components.Login.password.placeholder',
      defaultMessage: 'Password',
    },
    help: {
      id: 'app.components.Login.password.help',
      defaultMessage: 'Please enter your password',
    },
  },
});
