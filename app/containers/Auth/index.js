import { compose } from 'redux';
import { connect } from 'react-redux';

import Auth from 'components/Auth';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import saga from './saga';
import reducer from './reducer';

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

const withSaga = injectSaga({ key: 'auth', saga });

const withReducer = injectReducer({ key: 'auth', reducer });

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withSaga, withReducer, withConnect)(Auth);
