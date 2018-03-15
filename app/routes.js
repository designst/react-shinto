import App from './containers/App';
// import asyncHome from './containers/Home';
import Home from './containers/Home';

export default [
  {
    component: App,
    routes: [
      {
        path: '/',
        exact: true,
        component: Home,
        loadData: () => [],
      },
    ],
  },
];
