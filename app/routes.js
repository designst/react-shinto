import App from './containers/App';
import asyncHome from './containers/Home';
import NotFound from './containers/NotFound';

export default [
  {
    component: App,
    routes: [
      {
        path: '/',
        exact: true,
        component: asyncHome,
      },
      {
        component: NotFound,
      },
    ],
  },
];
