import { Event } from '@domains/events/entity/event.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAttendeeDto } from './dto/create-attendee.dto';
import { Attendee } from './entity/attendee.entity';

@Injectable()
export class AttendeesRepository {
  constructor(
    @InjectRepository(Attendee)
    private readonly attendeeRepository: Repository<Attendee>,
  ) {}

  async createAttendee(
    attendee: CreateAttendeeDto,
    event: Event,
  ): Promise<Attendee> {
    const { name } = attendee;
    return await this.attendeeRepository.save({
      name,
      event,
    });
  }

  async getAttendees(): Promise<Attendee[]> {
    return await this.attendeeRepository.find({ relations: ['event'] });
  }

  async getAttendee(id: string): Promise<Attendee> {
    const attendee = await this.attendeeRepository.findOne({
      where: { id },
      relations: ['event'],
    });

    if (!attendee) {
      throw new NotFoundException('Attendee not found');
    }

    return attendee;
  }

  async eventRegistration(attendeeId: string, event: Event): Promise<Attendee> {
    const attendee = await this.getAttendee(attendeeId);

    if (!attendee.event) {
      attendee.event = event;
    } else {
      throw new NotFoundException('Event already registered');
    }
    return await this.attendeeRepository.save(attendee);
  }
}
