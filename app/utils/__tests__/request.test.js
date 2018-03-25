/**
 * Test the request function
 */

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import request from '../request';

describe('request', () => {
  let mock;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  describe('stubbing successful response', () => {
    // Before each test, pretend we got a successful response
    beforeEach(() => {
      mock.onGet('/thisurliscorrect').reply(200, {
        hello: 'world',
      });
    });

    it('should format the response correctly', done => {
      request('/thisurliscorrect')
        .then(response => {
          expect(response.data.hello).toBe('world');
          done();
        })
        .catch(done);
    });
  });

  describe('stubbing 204 response', () => {
    // Before each test, pretend we got a successful response
    beforeEach(() => {
      mock.onGet('/thisurliscorrect').reply(204);
    });

    it('should return null on 204 response', done => {
      request('/thisurliscorrect')
        .then(response => {
          expect(response.data).toBeUndefined();
          done();
        })
        .catch(done);
    });
  });

  describe('stubbing error response', () => {
    // Before each test, pretend we got an unsuccessful response
    beforeEach(() => {
      mock.onGet('/thisdoesntexist').reply(404, {});
    });

    it('should catch errors', done => {
      request('/thisdoesntexist').catch(err => {
        expect(err.status).toBe(404);
        done();
      });
    });
  });
});
