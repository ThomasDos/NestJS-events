import { Injectable } from '@nestjs/common';
import { User } from '../users/entity/user.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { ListEventsDto } from './dto/list-events.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entity/event.entity';
import { EventsRepository } from './events.repository';

@Injectable()
export class EventsService {
  constructor(private eventsRepository: EventsRepository) {}
  async getEvents(filter: ListEventsDto) {
    return await this.eventsRepository.getEventsWithAttendeeCountPaginated(
      filter,
    );
  }

  async getEventsByUserIdPaginated(
    userId: string,
    filter: ListEventsDto,
  ): Promise<Event[]> {
    return await this.eventsRepository.getEventsByUserIdPaginated(
      userId,
      filter,
    );
  }

  async getEvent(id: string): Promise<Event> {
    return await this.eventsRepository.getEvent(id);
  }

  async createEvent(
    createEventDto: CreateEventDto,
    user: User,
  ): Promise<Event> {
    return await this.eventsRepository.createEvent(createEventDto, user);
  }

  async updateEvent(
    id: string,
    updateEventDto: UpdateEventDto,
    userId: string,
  ): Promise<Event> {
    return await this.eventsRepository.updateEvent(id, updateEventDto, userId);
  }

  async deleteEvent(id: string, userId: string): Promise<void> {
    return await this.eventsRepository.deleteEvent(id, userId);
  }
}
