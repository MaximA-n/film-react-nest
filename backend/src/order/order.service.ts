import { BadRequestException, Injectable } from '@nestjs/common';
import { FilmsRepository } from '../repository/films.repository';
import { CreateOrderDto, TicketDto } from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  async createOrder(dto: CreateOrderDto) {
    const groups = new Map<string, TicketDto[]>();

    for (const ticket of dto.tickets) {
      const key = `${ticket.film}::${ticket.session}`;
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(ticket);
    }

    for (const [, tickets] of groups) {
      const { film: filmId, session: sessionId } = tickets[0];

      const filmDoc = await this.filmsRepository.findOneById(filmId);
      if (!filmDoc) {
        throw new BadRequestException(`Фильм ${filmId} не найден`);
      }

      const session = filmDoc.schedule.find((s) => s.id === sessionId);
      if (!session) {
        throw new BadRequestException(`Сеанс ${sessionId} не найден`);
      }

      const newSeats = tickets.map((t) => `${t.row}:${t.seat}`);

      const uniqueNew = new Set(newSeats);
      if (uniqueNew.size !== newSeats.length) {
        throw new BadRequestException('В запросе есть дублирующиеся места');
      }

      for (const seat of newSeats) {
        if (session.taken.includes(seat)) {
          throw new BadRequestException(`Место ${seat} уже занято`);
        }
      }

      await this.filmsRepository.updateTaken(filmId, sessionId, newSeats);
    }

    return {
      total: dto.tickets.length,
      items: dto.tickets,
    };
  }
}
