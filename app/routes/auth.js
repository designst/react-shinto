import LoadableLogin from 'containers/Auth/Login/loadable';
import LoadableRegister from 'containers/Auth/Register/loadable';

const basePath = '/auth';

export default [
  {
    path: `${basePath}/login`,
    exact: true,
    component: LoadableLogin,
  },
  {
    path: `${basePath}/register`,
    exact: true,
    component: LoadableRegister,
  },
];
