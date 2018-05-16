import { compose } from 'redux';
import { connect } from 'react-redux';

import Logout from 'components/Auth/Logout';

import { logoutRequest } from './actions';

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  onSubmit: logoutRequest,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default compose(connector)(Logout);
