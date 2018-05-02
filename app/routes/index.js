import App from 'containers/App';
import NotFound from 'containers/NotFound';
import LoadableHome from 'containers/Home/loadable';

import { userIsAuthenticatedRedirect } from '../auth';

import authRoutes from './auth';

let Home = LoadableHome;

if (process.env.SHINTO_AUTH_REQUIRED === 'true') {
  Home = userIsAuthenticatedRedirect(LoadableHome);
}

let routes = [
  {
    path: '/',
    exact: true,
    component: Home,
  },
];

if (process.env.SHINTO_AUTH_ROUTES_ENABLED === 'true') {
  routes = routes.concat(authRoutes);
}

export default [
  {
    component: App,
    routes: [
      ...routes,
      {
        component: NotFound,
      },
    ],
  },
];
