import url from 'url';
import axios from 'axios';
import Debug from 'debug';
import { camelizeKeys } from 'humps';

import {
  API_ERROR,
  API_AUTH_ERROR,
  API_SERVER_ERROR,
  API_NOT_FOUND_ERROR,
} from 'providers/Error/constants';

const debug = new Debug('shinto:app:utils:api-service');

export const ApiRequest = axios.create();

ApiRequest.interceptors.response.use(
  response => {
    response.data = camelizeKeys(response.data);

    return response;
  },

  error => {
    const { message, response } = error;
    const { status, statusText } = response;

    let errorType;

    switch (status) {
      case 403:
        errorType = API_AUTH_ERROR;
        break;
      case 404:
        errorType = API_NOT_FOUND_ERROR;
        break;
      case 500:
        errorType = API_SERVER_ERROR;
        break;
      default:
        errorType = API_ERROR;
        break;
    }

    const err = {
      type: errorType,
      status,
      message: statusText || message,
    };

    return Promise.reject(err);
  },
);

class ApiService {
  constructor(token) {
    this.token = token;
    this.store = null;
    this.isServerSide = __SERVER__;
  }

  get = (requestUrl, params) => {
    debug('GET: %s', requestUrl);
    return ApiRequest.get(url.resolve('/api', requestUrl), params).catch(this.handleError);
  };

  post = (requestUrl, data) => {
    debug('POST: %s', requestUrl);
    return ApiRequest.post(url.resolve('/api', requestUrl), data).catch(this.handleError);
  };

  handleError = error => {
    this.store.dispatch(error);

    throw error;
  };
}

export const createApiServicePlugin = apiService => ({
  middleware: () => next => action => {
    action.meta = action.meta || {};

    action.meta.apiService = apiService;

    return next(action);
  },
});

export default token => new ApiService(token);
