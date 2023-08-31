import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entity/event.entity';

@Injectable()
export class EventsRepository {
  constructor(
    @InjectRepository(Event)
    private repository: Repository<Event>,
  ) {}
  async getEvents(): Promise<Event[]> {
    return await this.repository.find();
  }

  async getEvent(id: string): Promise<Event> {
    return await this.repository.findOneBy({ id });
  }

  async createEvent(createEventDto: CreateEventDto): Promise<Event> {
    const event = await this.repository.save(createEventDto);
    return event;
  }

  async updateEvent(
    id: string,
    updateEventDto: UpdateEventDto,
  ): Promise<Event> {
    await this.repository.update(id, updateEventDto);
    return await this.repository.findOne({ where: { id } });
  }

  async deleteEvent(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
