import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Film } from '../entities/film.entity';
import { Schedule } from '../entities/schedule.entity';

@Injectable()
export class FilmsRepository {
  constructor(
    @InjectRepository(Film)
    private filmRepository: Repository<Film>,

    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
  ) {}

  async findAll(): Promise<Film[]> {
    return this.filmRepository.find();
  }

  async findOneById(id: string): Promise<Film | null> {
    return this.filmRepository.findOne({
      where: { id },
      relations: ['schedule'],
    });
  }

  async updateTaken(
    filmId: string,
    sessionId: string,
    newSeats: string[],
  ): Promise<void> {
    const schedule = await this.scheduleRepository.findOne({
      where: { id: sessionId },
    });

    if (!schedule) return;

    const currentTaken = schedule.taken.filter((s) => s !== '');

    schedule.taken = [...currentTaken, ...newSeats];

    await this.scheduleRepository.save(schedule);
  }
}
