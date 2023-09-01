import { Injectable } from '@nestjs/common';
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

  async getEvent(id: string): Promise<Event> {
    return await this.eventsRepository.getEvent(id);
  }

  async createEvent(createEventDto: CreateEventDto): Promise<Event> {
    return await this.eventsRepository.createEvent(createEventDto);
  }

  async updateEvent(
    id: string,
    updateEventDto: UpdateEventDto,
  ): Promise<Event> {
    return await this.eventsRepository.updateEvent(id, updateEventDto);
  }

  async deleteEvent(id: string): Promise<void> {
    return await this.eventsRepository.deleteEvent(id);
  }
}
