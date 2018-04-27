import axios from 'axios';
import { camelizeKeys } from 'humps';

export const ApiRequest = axios.create();

ApiRequest.interceptors.response.use(
  response => {
    response.data = camelizeKeys(response.data);

    return response;
  },

  error => {
    const { message, response } = error;
    const { status, statusText } = response;

    let errorType = 'API_ERROR';

    if (status === 403) {
      errorType = 'API_AUTH_ERROR';
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

  get = url => ApiRequest.get(url).catch(this.handleError);

  post = url => ApiRequest.post(url).catch(this.handleError);

  handleError = error => this.store.dispatch(error);
}

export const createApiServicePlugin = apiService => ({
  middleware: () => next => action => {
    action.meta = action.meta || {};

    action.meta.apiService = apiService;

    return next(action);
  },
});

export default token => new ApiService(token);
