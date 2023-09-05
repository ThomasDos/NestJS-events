import { Event } from '@domains/events/entity/event.entity';
import { Injectable } from '@nestjs/common';
import { EventsService } from '../events/events.service';
import { AttendeesRepository } from './attendees.repository';
import { CreateAttendeeDto } from './dto/create-attendee.dto';

@Injectable()
export class AttendeesService {
  constructor(
    private readonly attendeesRepository: AttendeesRepository,
    private readonly eventsService: EventsService,
  ) {}
  async createAttendee(attendee: CreateAttendeeDto) {
    const event = await this.eventsService.getEvent(attendee.event_id);
    return await this.attendeesRepository.createAttendee(attendee, event);
  }

  async getAttendees() {
    return await this.attendeesRepository.getAttendees();
  }

  async getAttendeesByEvent(eventId: string) {
    return await this.attendeesRepository.getAttendeesByEvent(eventId);
  }

  async getAttendee(id: string) {
    return await this.attendeesRepository.getAttendee(id);
  }

  async eventRegistration(attendeeId: string, event: Event) {
    return await this.attendeesRepository.eventRegistration(attendeeId, event);
  }
}
