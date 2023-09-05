import { EventsService } from '@domains/events/events.service';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AttendeesService } from './attendees.service';
import { CreateAttendeeDto } from './dto/create-attendee.dto';

@Controller('attendees')
@UseInterceptors(ClassSerializerInterceptor)
export class AttendeesController {
  constructor(
    private attendeesService: AttendeesService,
    private eventsService: EventsService,
  ) {}

  @Get()
  async getAttendees() {
    return await this.attendeesService.getAttendees();
  }

  @Get('event/:id')
  async getAttendeesByEvent(@Param('id') eventId: string) {
    return await this.attendeesService.getAttendeesByEvent(eventId);
  }

  @Get(':id')
  async getAttendee(@Param('id') id: string) {
    return await this.attendeesService.getAttendee(id);
  }

  @Post()
  async createAttendee(@Body() attendee: CreateAttendeeDto) {
    return await this.attendeesService.createAttendee(attendee);
  }

  @Post(':id/event/:event_id')
  async eventRegistration(
    @Param('id') attendeeId: string,
    @Param('event_id') eventId: string,
  ) {
    const event = await this.eventsService.getEvent(eventId);
    return await this.attendeesService.eventRegistration(attendeeId, event);
  }
}
