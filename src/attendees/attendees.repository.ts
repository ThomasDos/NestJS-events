import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from 'src/events/entity/event.entity';
import { Repository } from 'typeorm';
import { CreateAttendeeDto } from './dto/create-attendee.dto';
import { Attendee } from './entity/attendee.entity';

@Injectable()
export class AttendeesRepository {
  constructor(
    @InjectRepository(Attendee)
    private readonly attendeeRepository: Repository<Attendee>,
  ) {}

  async createAttendee(attendee: CreateAttendeeDto): Promise<Attendee> {
    return await this.attendeeRepository.save(attendee);
  }

  async getAttendees(): Promise<Attendee[]> {
    return await this.attendeeRepository.find();
  }

  async getAttendee(id: string): Promise<Attendee> {
    const attendee = await this.attendeeRepository.findOne({
      where: { id },
      relations: ['events'],
    });

    if (!attendee) {
      throw new NotFoundException('Attendee not found');
    }

    return attendee;
  }

  async eventRegistration(attendeeId: string, event: Event): Promise<Attendee> {
    const attendee = await this.getAttendee(attendeeId);

    if (!attendee.events.length) {
      attendee.events = [event];
      await this.attendeeRepository.save(attendee);
    } else {
      attendee.events.push(event);
      await this.attendeeRepository.save(attendee);
    }
    return attendee;
  }
}
