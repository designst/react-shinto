import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import { deleteMessage } from './actions';
import { makeSelectMessages } from './selectors';

export class MessageProvider extends React.Component {
  state = {
    open: false,
    message: {},
  };

  componentDidMount() {
    this.processMessages();
  }

  // noinspection JSCheckFunctionSignatures
  shouldComponentUpdate(nextProps) {
    if (this.props.messages.length !== nextProps.messages.length) {
      if (this.state.open) {
        this.closeMessage();
      }
    }

    return true;
  }

  // noinspection JSCheckFunctionSignatures
  componentDidUpdate() {
    this.processMessages();
  }

  closeMessage = () => {
    const { id } = this.state.message;

    this.props.deleteMessage(id);

    this.setState({
      open: false,
    });
  };

  processMessages = () => {
    const { open } = this.state;
    const { messages } = this.props;

    if (!open && messages.length > 0) {
      this.setState({
        open: true,
        message: messages[0],
      });
    }
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.closeMessage();
  };

  handleExited = () => {
    this.processMessages();
  };

  render() {
    const { id, text, options } = this.state.message;

    return (
      <div className="b-message-provider">
        {React.Children.only(this.props.children)}

        {id &&
          text && (
            <Snackbar
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              {...options}
              key={id}
              open={this.state.open}
              onClose={this.handleClose}
              onExited={this.handleExited}
              ContentProps={{
                'aria-describedby': 'message-id',
              }}
              message={
                <span id="message-id">
                  {id} - {text}
                </span>
              }
              action={[
                <Button key="undo" color="secondary" size="small" onClick={this.handleClose}>
                  UNDO
                </Button>,
                <IconButton
                  key="close"
                  color="inherit"
                  aria-label="Close"
                  onClick={this.handleClose}
                >
                  <CloseIcon />
                </IconButton>,
              ]}
            />
          )}
      </div>
    );
  }
}

MessageProvider.propTypes = {
  messages: PropTypes.array.isRequired,
  children: PropTypes.element.isRequired,
  deleteMessage: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  messages: makeSelectMessages(),
});

const mapDispatchToProps = {
  deleteMessage,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MessageProvider);
