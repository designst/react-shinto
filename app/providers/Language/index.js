/*
 *
 * LanguageProvider
 *
 * this component connects the redux state language locale to the
 * IntlProvider component and i18n messages (loaded from `app/translations`)
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { createSelector } from 'reselect';

import { makeSelectLocale } from './selectors';

export class LanguageProvider extends PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <IntlProvider
        key={this.props.locale}
        locale={this.props.locale}
        messages={this.props.messages[this.props.locale]}
      >
        {React.Children.only(this.props.children)}
      </IntlProvider>
    );
  }
}

LanguageProvider.propTypes = {
  locale: PropTypes.string,
  messages: PropTypes.object,
  children: PropTypes.element.isRequired,
};

const mapStateToProps = createSelector(
  makeSelectLocale(),
  (locale) => ({locale})
);

export default connect(mapStateToProps)(LanguageProvider);
