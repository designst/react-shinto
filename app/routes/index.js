import App from 'containers/App';
import NotFound from 'containers/NotFound';
import LoadableHome from 'containers/Home/loadable';

import authRoutes from './auth';

let routes = [
  {
    path: '/',
    exact: true,
    component: LoadableHome,
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
