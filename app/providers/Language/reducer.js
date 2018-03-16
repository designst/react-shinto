/*
 *
 * LanguageProvider reducer
 *
 */

import fp from 'lodash/fp';

import {
  CHANGE_LOCALE,
} from './constants';

import {
  DEFAULT_LOCALE,
} from '../../containers/App/constants';

const initialState = {
  locale: DEFAULT_LOCALE,
};

const languageProviderReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_LOCALE:
      return fp.assign(state, {
        locale: action.locale,
      });
    default:
      return state;
  }
};

export default languageProviderReducer;
