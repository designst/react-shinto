import Auth from 'containers/Auth';
import LoadableLogin from 'containers/Auth/Login/loadable';
import LoadableRegister from 'containers/Auth/Register/loadable';

import { userIsNotAuthenticatedRedirect } from '../auth';

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
    ],
  },
];
