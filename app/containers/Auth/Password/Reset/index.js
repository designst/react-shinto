import { compose } from 'redux';
import { connect } from 'react-redux';

import PasswordReset from 'components/Auth/Password/Reset';

import { passwordResetRequest } from './actions';

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  onSubmit: passwordResetRequest,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default compose(connector)(PasswordReset);
