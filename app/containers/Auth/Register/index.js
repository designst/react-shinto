import { compose } from 'redux';
import { connect } from 'react-redux';

import Register from 'components/Auth/Register';

import { registerRequest } from './actions';

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  onSubmit: registerRequest,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default compose(connector)(Register);
