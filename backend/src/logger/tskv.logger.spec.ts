import { TskvLogger } from './tskv.logger';

describe('TskvLogger', () => {
  let logger: TskvLogger;

  beforeEach(() => {
    logger = new TskvLogger();
  });

  describe('formatMessage', () => {
    it('поля должны быть разделены табуляцией', () => {
      const result = logger.formatMessage('log', 'test');
      const parts = result.split('\t');
      expect(parts.length).toBeGreaterThanOrEqual(3);
    });

    it('должен содержать поле time=', () => {
      const result = logger.formatMessage('log', 'test');
      expect(result).toContain('time=');
    });

    it('должен содержать поле level=', () => {
      const result = logger.formatMessage('warn', 'test');
      expect(result).toContain('level=warn');
    });

    it('должен содержать поле message=', () => {
      const result = logger.formatMessage('log', 'hello world');
      expect(result).toContain('message=hello world');
    });

    it('должен добавлять params= если есть дополнительные параметры', () => {
      const result = logger.formatMessage('log', 'test', 'extra');
      expect(result).toContain('params=');
    });

    it('не должен добавлять params= если нет дополнительных параметров', () => {
      const result = logger.formatMessage('log', 'test');
      expect(result).not.toContain('params=');
    });
  });

  describe('методы логирования', () => {
    it('log должен вызывать console.log', () => {
      const spy = jest.spyOn(console, 'log').mockImplementation(() => {});
      logger.log('test');
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });

    it('error должен вызывать console.error', () => {
      const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
      logger.error('test');
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });
  });
});
