import { Event } from '@domains/events/entity/event.entity';
import { Injectable } from '@nestjs/common';
import { AttendeesRepository } from './attendees.repository';
import { CreateAttendeeDto } from './dto/create-attendee.dto';

@Injectable()
export class AttendeesService {
  constructor(private readonly attendeesRepository: AttendeesRepository) {}
  async createAttendee(attendee: CreateAttendeeDto) {
    return await this.attendeesRepository.createAttendee(attendee);
  }

  async getAttendees() {
    return await this.attendeesRepository.getAttendees();
  }

  async getAttendee(id: string) {
    return await this.attendeesRepository.getAttendee(id);
  }

  async eventRegistration(attendeeId: string, event: Event) {
    return await this.attendeesRepository.eventRegistration(attendeeId, event);
  }
}
