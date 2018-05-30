import { compose } from 'redux';
import { connect } from 'react-redux';

import PasswordChange from 'components/Auth/Password/Change';

import { passwordChangeRequest } from './actions';

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  onSubmit: passwordChangeRequest,
};

const connector = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(connector)(PasswordChange);
