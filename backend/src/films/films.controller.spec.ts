import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';

const mockFilmsService = {
  findAll: jest.fn(),
  findSchedule: jest.fn(),
};

describe('FilmsController', () => {
  let controller: FilmsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [
        { provide: FilmsService, useValue: mockFilmsService },
      ],
    }).compile();

    controller = module.get<FilmsController>(FilmsController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('должен быть определён', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('должен возвращать список фильмов', async () => {
      const mockResult = {
        total: 2,
        items: [
          { id: '1', title: 'Фильм 1' },
          { id: '2', title: 'Фильм 2' },
        ],
      };
      mockFilmsService.findAll.mockResolvedValue(mockResult);

      const result = await controller.findAll();

      expect(result).toEqual(mockResult);
      expect(mockFilmsService.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('findSchedule', () => {
    it('должен возвращать расписание фильма', async () => {
      const mockResult = {
        total: 9,
        items: [{ id: 'session-1', daytime: '2024-06-28T10:00:00' }],
      };
      mockFilmsService.findSchedule.mockResolvedValue(mockResult);

      const result = await controller.findSchedule('film-id-1');

      expect(result).toEqual(mockResult);
      expect(mockFilmsService.findSchedule).toHaveBeenCalledWith('film-id-1');
    });
  });
});
