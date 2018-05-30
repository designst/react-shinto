import { compose } from 'redux';
import { connect } from 'react-redux';

import Login from 'components/Auth/Login';

import { loginRequest } from './actions';

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  onSubmit: loginRequest,
};

const connector = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(connector)(Login);
