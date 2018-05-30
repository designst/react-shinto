import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

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
        this.setState({
          open: false,
        });
      }
    }

    return true;
  }

  // noinspection JSCheckFunctionSignatures
  componentDidUpdate() {
    this.processMessages();
  }

  processMessages = () => {
    const { messages } = this.props;

    if (messages.length > 0) {
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

    this.setState({ open: false });
  };

  handleExited = () => {
    this.processMessages();
  };

  render() {
    const { id, text } = this.state.message;

    return (
      <div className="b-message-provider">
        {React.Children.only(this.props.children)}

        {id &&
          text && (
            <Snackbar
              key={id}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              open={this.state.open}
              autoHideDuration={6000}
              onClose={this.handleClose}
              onExited={this.handleExited}
              ContentProps={{
                'aria-describedby': 'message-id',
              }}
              message={<span id="message-id">{text}</span>}
              action={[
                <Button key="undo" color="secondary" size="small" onClick={this.handleClose}>
                  UNDO
                </Button>,
                <IconButton
                  key="close"
                  aria-label="Close"
                  color="inherit"
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
};

const mapStateToProps = createStructuredSelector({
  messages: makeSelectMessages(),
});

export default connect(mapStateToProps)(MessageProvider);
