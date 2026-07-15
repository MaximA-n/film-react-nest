import { JsonLogger } from './json.logger';

describe('JsonLogger', () => {
  let logger: JsonLogger;

  beforeEach(() => {
    logger = new JsonLogger();
  });

  describe('formatMessage', () => {
    it('должен возвращать валидный JSON', () => {
      const result = logger.formatMessage('log', 'test message');
      const parsed = JSON.parse(result);
      expect(parsed).toBeDefined();
    });

    it('должен содержать поле level', () => {
      const result = logger.formatMessage('error', 'test');
      const parsed = JSON.parse(result);
      expect(parsed.level).toBe('error');
    });

    it('должен содержать поле message', () => {
      const result = logger.formatMessage('log', 'hello world');
      const parsed = JSON.parse(result);
      expect(parsed.message).toBe('hello world');
    });

    it('должен содержать поле timestamp', () => {
      const result = logger.formatMessage('log', 'test');
      const parsed = JSON.parse(result);
      expect(parsed.timestamp).toBeDefined();
    });
  });

  describe('методы логирования', () => {
    it('log должен вызывать console.log', () => {
      const spy = jest.spyOn(console, 'log').mockImplementation(() => {});
      logger.log('test message');
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });

    it('error должен вызывать console.error', () => {
      const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
      logger.error('error message');
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });

    it('warn должен вызывать console.warn', () => {
      const spy = jest.spyOn(console, 'warn').mockImplementation(() => {});
      logger.warn('warn message');
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });
  });
});
