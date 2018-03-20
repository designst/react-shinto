import axios from 'axios';
import forEach from 'lodash/forEach';
import { camelizeKeys, decamelizeKeys } from 'humps';

const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;

  throw error;
};

const defaultConfig = {
  camelize: true,
  decamelize: true,
};

const request = (url, { data, config = {}, ...options } = {}) => {
  const { camelize, decamelize } = {
    ...defaultConfig,
    ...config,
  };

  return axios({
    url,
    data: decamelize ? decamelizeKeys(data) : data,
    ...options,
  })
    .then(checkStatus)
    .then(response => {
      if (camelize) {
        response.data = camelizeKeys(response.data);
      }

      return response;
    })
    .catch(err => {
      if (err.response) {
        const { response } = err;

        const { status, statusText } = response;
        const { detail = statusText } = response.data;

        const error = new Error(detail);
        error.status = status;
        error.statusText = statusText;

        throw error;
      }

      if (err.message) {
        throw err.message;
      }

      if (err.request) {
        throw err.request;
      }

      throw err;
    });
};

forEach(['get', 'post'], method => {
  request[method] = (url, options) =>
    request(url, {
      ...options,
      method,
    });
});

export default request;
