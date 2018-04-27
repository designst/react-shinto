import MockAdapter from 'axios-mock-adapter';
import { memoryHistory } from 'react-router-dom';

import configureStore from '../configureStore';
import createApiService, { ApiRequest } from '../apiService';

describe('ApiService', () => {
  let store;
  let apiService;
  let mockAdapter;

  beforeEach(() => {
    mockAdapter = new MockAdapter(ApiRequest);

    apiService = createApiService('token');
    store = configureStore(memoryHistory, {});

    apiService.store = store;
  });

  afterEach(() => {
    mockAdapter.reset();
  });

  describe('handle success response', () => {
    beforeEach(() => {
      mockAdapter.onGet('/request').reply(200, {
        is_success: true,
      });

      mockAdapter.onPost('/request').reply(200, {
        is_success: true,
      });
    });

    it('should handle client get request', async () => {
      apiService.isServerSide = false;

      const response = await apiService.get('/request');
      // noinspection JSUnresolvedVariable
      expect(response.data.isSuccess).toBeTruthy();
    });

    it('should handle client post request', async () => {
      apiService.isServerSide = false;

      const response = await apiService.post('/request');
      // noinspection JSUnresolvedVariable
      expect(response.data.isSuccess).toBeTruthy();
    });

    it('should handle server get request', async () => {
      apiService.isServerSide = true;

      const response = await apiService.get('/request');
      // noinspection JSUnresolvedVariable
      expect(response.data.isSuccess).toBeTruthy();
    });

    it('should handle server post request', async () => {
      apiService.isServerSide = true;

      const response = await apiService.post('/request');
      // noinspection JSUnresolvedVariable
      expect(response.data.isSuccess).toBeTruthy();
    });
  });

  describe('handle failure response', () => {
    beforeEach(() => {
      mockAdapter.onGet('/request').reply(500, {
        is_success: false,
      });

      mockAdapter.onPost('/request').reply(500, {
        is_success: false,
      });
    });

    it('should handle client get request', async () => {
      apiService.isServerSide = false;

      try {
        await apiService.get('/request');
      } catch (error) {
        expect(error.type).toEqual('API_ERROR');
        expect(error.status).toEqual(500);
      }
    });

    it('should handle client post request', async () => {
      apiService.isServerSide = false;

      try {
        await apiService.post('/request');
      } catch (error) {
        expect(error.type).toEqual('API_ERROR');
        expect(error.status).toEqual(500);
      }
    });

    it('should handle server get request', async () => {
      apiService.isServerSide = true;

      try {
        await apiService.get('/request');
      } catch (error) {
        expect(error.type).toEqual('API_ERROR');
        expect(error.status).toEqual(500);
      }
    });

    it('should handle server post request', async () => {
      apiService.isServerSide = true;

      try {
        await apiService.post('/request');
      } catch (error) {
        expect(error.type).toEqual('API_ERROR');
        expect(error.status).toEqual(500);
      }
    });
  });

  describe('handle unauthorized response', () => {
    beforeEach(() => {
      mockAdapter.onGet('/request').reply(403, {
        is_success: false,
      });

      mockAdapter.onPost('/request').reply(403, {
        is_success: false,
      });
    });

    it('should handle client get request', async () => {
      apiService.isServerSide = false;

      try {
        await apiService.get('/request');
      } catch (error) {
        expect(error.type).toEqual('API_AUTH_ERROR');
        expect(error.status).toEqual(403);
      }
    });

    it('should handle client post request', async () => {
      apiService.isServerSide = false;

      try {
        await apiService.post('/request');
      } catch (error) {
        expect(error.type).toEqual('API_AUTH_ERROR');
        expect(error.status).toEqual(403);
      }
    });

    it('should handle server get request', async () => {
      apiService.isServerSide = true;

      try {
        await apiService.get('/request');
      } catch (error) {
        expect(error.type).toEqual('API_AUTH_ERROR');
        expect(error.status).toEqual(403);
      }
    });

    it('should handle server post request', async () => {
      apiService.isServerSide = true;

      try {
        await apiService.post('/request');
      } catch (error) {
        expect(error.type).toEqual('API_AUTH_ERROR');
        expect(error.status).toEqual(403);
      }
    });
  });
});
