import { compose } from 'redux';
import { connect } from 'react-redux';

import PasswordResetConfirm from 'components/Auth/Password/Reset/Confirm';

import { passwordResetConfirmRequest } from './actions';

const mapStateToProps = (state, { match }) => ({
  initialValues: {
    token: match.params.token,
  },
});

const mapDispatchToProps = {
  onSubmit: passwordResetConfirmRequest,
};

const connector = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(connector)(PasswordResetConfirm);
