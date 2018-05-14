/* @flow */

import loadable from 'loadable-components';

import Loading from 'components/Loading';
import ErrorDisplay from 'components/ErrorDisplay';

export default loadable(() => import(/* webpackChunkName: 'auth/password/change' */ './index'), {
  LoadingComponent: Loading,
  ErrorComponent: ErrorDisplay,
});
