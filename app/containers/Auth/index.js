import { compose } from 'redux';
import { connect } from 'react-redux';

import Auth from 'components/Auth';

import injectReducer from 'utils/injectReducer';

import reducer from './reducer';

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

const withReducer = injectReducer({ key: 'auth', reducer });

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withReducer, withConnect)(Auth);
