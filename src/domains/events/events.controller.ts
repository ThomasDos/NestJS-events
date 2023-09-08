import { CurrentUser } from '@/shared/decorators/current-user.decorator';
import { AuthGuardJwt } from '@/shared/guards/auth-guard-jwt.guard';
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
  Query,
  UseGuards,
} from '@nestjs/common';
import { User } from '../users/entity/user.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { ListEventsDto } from './dto/list-events.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @Get()
  getEvents(@Query() filter: ListEventsDto) {
    return this.eventsService.getEvents(filter);
  }

  @Get('user/:userId')
  getEventsByUserId(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Query() filter: ListEventsDto,
  ) {
    return this.eventsService.getEventsByUserIdPaginated(userId, filter);
  }

  @Get(':id')
  getEvent(@Param('id', ParseUUIDPipe) id: string) {
    return this.eventsService.getEvent(id);
  }

  @Post()
  @UseGuards(AuthGuardJwt)
  createEvent(@Body() input: CreateEventDto, @CurrentUser() user: User) {
    return this.eventsService.createEvent(input, user);
  }

  @Patch(':id')
  @UseGuards(AuthGuardJwt)
  updateEvent(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() input: UpdateEventDto,
    @CurrentUser() user,
  ) {
    return this.eventsService.updateEvent(id, input, user.id);
  }

  @Delete(':id')
  @UseGuards(AuthGuardJwt)
  @HttpCode(204)
  removeEvent(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user) {
    return this.eventsService.deleteEvent(id, user.id);
  }
}
