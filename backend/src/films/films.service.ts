import { Injectable, NotFoundException } from '@nestjs/common';
import { FilmsRepository } from '../repository/films.repository';

@Injectable()
export class FilmsService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  async findAll() {
    const films = await this.filmsRepository.findAll();
    return {
      total: films.length,
      items: films,
    };
  }

  async findSchedule(id: string) {
    const film = await this.filmsRepository.findOneById(id);

    if (!film) {
      throw new NotFoundException(`Фильм с id ${id} не найден`);
    }

    return {
      total: film.schedule.length,
      items: film.schedule,
    };
  }
}
