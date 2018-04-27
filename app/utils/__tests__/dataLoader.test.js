import dataLoader from '../dataLoader';

let isDone = false;

const callback = () => {
  isDone = true;
};

const mockObject = jest.fn((state = {}) => ({
  store: {
    getState: jest.fn().mockReturnValue(state),
  },
  sagaInjectors: { injectSaga: jest.fn() },
  modelInjectors: { injectModels: jest.fn() },
  reducerInjectors: { injectReducer: jest.fn() },
}));

describe('dataLoader', () => {
  afterEach(() => {
    isDone = false;
  });

  describe('ignore authentication', () => {
    it('should handle empty configuration', async () => {
      await dataLoader({ ignoreAuthentication: true, callback })(mockObject());

      expect(isDone).toBe(true);
    });

    it('should handle saga configuration', async () => {
      await dataLoader({
        saga: new Promise(resolve => resolve({ default: 'saga' })),
        ignoreAuthentication: true,
        callback,
      })(mockObject());

      expect(isDone).toBe(true);
    });

    it('should handle model configuration', async () => {
      await dataLoader({
        model: new Promise(resolve => resolve(['model'])),
        ignoreAuthentication: true,
        callback,
      })(mockObject());

      expect(isDone).toBe(true);
    });

    it('should handle reducer configuration', async () => {
      await dataLoader({
        reducer: new Promise(resolve => resolve({ default: 'reducer' })),
        ignoreAuthentication: true,
        callback,
      })(mockObject());

      expect(isDone).toBe(true);
    });

    it('should handle saga model reducer configuration', async () => {
      await dataLoader({
        saga: new Promise(resolve => resolve({ default: 'saga' })),
        model: new Promise(resolve => resolve(['model'])),
        reducer: new Promise(resolve => resolve({ default: 'reducer' })),
        ignoreAuthentication: true,
        callback,
      })(mockObject());

      expect(isDone).toBe(true);
    });
  });

  describe('handle authentication', () => {
    it('should handle not authenticated by default', async () => {
      const data = await dataLoader({})(mockObject({ auth: { isAuthenticated: false } }));

      expect(data).toEqual([]);
    });

    it('should handle not authenticated', async () => {
      const data = await dataLoader({ ignoreAuthentication: false })(
        mockObject({ auth: { isAuthenticated: false } }),
      );

      expect(data).toEqual([]);
    });

    it('should handle authenticated', async () => {
      const data = await dataLoader({ ignoreAuthentication: false })(
        mockObject({ auth: { isAuthenticated: true } }),
      );

      console.log(data);

      expect(data).toEqual(undefined);
    });
  });
});
