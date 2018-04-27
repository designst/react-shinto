import App from 'containers/App';
import NotFound from 'containers/NotFound';
import LoadableHome from 'containers/Home/loadable';

export default [
  {
    component: App,
    routes: [
      {
        path: '/',
        exact: true,
        component: LoadableHome,
      },
      {
        component: NotFound,
      },
    ],
  },
];
