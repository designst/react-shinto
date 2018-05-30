import { compose } from 'redux';
import { connect } from 'react-redux';

import RegisterConfirm from 'components/Auth/Register/Confirm';

import { registerConfirmRequest } from './actions';

const mapStateToProps = (state, { match }) => ({
  token: match.params.token,
});

const mapDispatchToProps = {
  onSubmit: registerConfirmRequest,
};

const connector = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(connector)(RegisterConfirm);
