import { paginate } from '@/shared/pagination/paginator';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as dayjs from 'dayjs';
import { Repository } from 'typeorm';
import { User } from '../users/entity/user.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { ListEventsDto, WHEN_EVENT_FILTER } from './dto/list-events.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entity/event.entity';

@Injectable()
export class EventsRepository {
  constructor(
    @InjectRepository(Event)
    private repository: Repository<Event>,
  ) {}

  private readonly logger = new Logger(EventsRepository.name);

  private getEventsBaseQuery() {
    return this.repository.createQueryBuilder('e').orderBy('e.id', 'DESC');
  }

  async getEvents(): Promise<Event[]> {
    return await this.repository.find();
  }

  async getEvent(id: string): Promise<Event> {
    const event = await this.repository.findOne({
      where: { id },
      relations: ['attendees'],
    });

    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
    return event;
  }

  async getEventWithAttendeeCount(id: string): Promise<Event> {
    const event = await this.getEventsBaseQuery()
      .andWhere({ id })
      .loadAllRelationIds({ relations: ['attendees'] })
      .loadRelationCountAndMap('e.attendeesCount', 'e.attendees')
      .getOne();

    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
    return event;
  }

  getEventsWithAttendeeCount(filter: ListEventsDto) {
    const query = this.getEventsBaseQuery()
      .loadAllRelationIds({ relations: ['attendees'] })
      .loadRelationCountAndMap('e.attendeesCount', 'e.attendees');

    switch (filter.when) {
      case WHEN_EVENT_FILTER.TODAY:
        query.andWhere(
          `e.event_date BETWEEN CURRENT_DATE AND CURRENT_DATE + 1`,
        );
        break;
      case WHEN_EVENT_FILTER.TOMORROW:
        query.andWhere(
          `e.event_date BETWEEN CURRENT_DATE + 1 AND CURRENT_DATE + 2`,
        );
        break;
      case WHEN_EVENT_FILTER.THIS_WEEK:
        query.andWhere(`e.event_date BETWEEN :start AND :end`, {
          start: dayjs().startOf('month').toISOString(),
          end: dayjs().endOf('month').toISOString(),
        });
        break;
      case WHEN_EVENT_FILTER.NEXT_WEEK:
        query.andWhere(`e.event_date BETWEEN :start AND :end`, {
          start: dayjs().add(1, 'month').startOf('month').toISOString(),
          end: dayjs().add(1, 'month').endOf('month').toISOString(),
        });
        break;
    }

    return query;
  }

  async getEventsWithAttendeeCountPaginated(filter: ListEventsDto) {
    const query = this.getEventsWithAttendeeCount(filter);
    delete filter.when;
    const { ...options } = filter;
    const { data } = await paginate<Event>(query, options);
    return data;
  }

  async createEvent(
    createEventDto: CreateEventDto,
    user: User,
  ): Promise<Event> {
    const event = await this.repository.save({
      ...createEventDto,
      user,
    });
    return event;
  }

  async updateEvent(
    id: string,
    updateEventDto: UpdateEventDto,
    userId: string,
  ): Promise<Event> {
    await this.repository.update({ id, user_id: userId }, updateEventDto);
    return await this.repository.findOne({ where: { id, user_id: userId } });
  }

  async deleteEvent(id: string, userId: string): Promise<void> {
    const result = await this.repository.delete({ user_id: userId, id: id });
    if (!result.affected) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
  }
}
