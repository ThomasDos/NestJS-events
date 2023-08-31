import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entity/event.entity';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  private events: Event[] = [];
  constructor(private eventsService: EventsService) {}

  @Get()
  getEvents() {
    return this.eventsService.getEvents();
  }

  @Get(':id')
  getEvent(@Param('id', ParseUUIDPipe) id: string) {
    return this.eventsService.getEvent(id);
  }

  @Post()
  createEvent(@Body() input: CreateEventDto) {
    return this.eventsService.createEvent(input);
  }

  @Patch(':id')
  updateEvent(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() input: UpdateEventDto,
  ) {
    return this.eventsService.updateEvent(id, input);
  }

  @Delete(':id')
  @HttpCode(204)
  removeEvent(@Param('id', ParseUUIDPipe) id: string) {
    return this.eventsService.deleteEvent(id);
  }
}
