import Auth from 'containers/Auth';
import LoadableLogin from 'containers/Auth/Login/loadable';
import LoadableRegister from 'containers/Auth/Register/loadable';
import LoadablePasswordReset from 'containers/Auth/Password/Reset/loadable';
import LoadablePasswordChange from 'containers/Auth/Password/Change/loadable';
import LoadableRegisterConfirm from 'containers/Auth/Register/Confirm/loadable';
import LoadablePasswordResetConfirm from 'containers/Auth/Password/Reset/Confirm/loadable';

import {
  userIsNotConfirmedRedirect,
  userIsAuthenticatedRedirect,
  userIsNotAuthenticatedRedirect,
} from '../auth';

const basePath = '/auth';

export default [
  {
    path: basePath,
    component: Auth,
    routes: [
      {
        path: `${basePath}/login`,
        exact: true,
        component: userIsNotAuthenticatedRedirect(LoadableLogin),
      },
      {
        path: `${basePath}/register`,
        exact: true,
        component: userIsNotAuthenticatedRedirect(LoadableRegister),
      },
      {
        path: `${basePath}/register/confirm/:token?`,
        exact: true,
        component: userIsNotConfirmedRedirect(LoadableRegisterConfirm),
      },
      {
        path: `${basePath}/password/change`,
        exact: true,
        component: userIsAuthenticatedRedirect(LoadablePasswordChange),
      },
      {
        path: `${basePath}/password/reset`,
        exact: true,
        component: userIsNotAuthenticatedRedirect(LoadablePasswordReset),
      },
      {
        path: `${basePath}/password/reset/confirm/:token`,
        exact: true,
        component: userIsNotAuthenticatedRedirect(LoadablePasswordResetConfirm),
      },
    ],
  },
];
