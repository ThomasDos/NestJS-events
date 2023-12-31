import { EventsModule } from '@domains/events/events.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttendeesController } from './attendees.controller';
import { AttendeesRepository } from './attendees.repository';
import { AttendeesService } from './attendees.service';
import { Attendee } from './entity/attendee.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Attendee]), EventsModule],
  providers: [AttendeesService, AttendeesRepository],
  controllers: [AttendeesController],
})
export class AttendeesModule {}
