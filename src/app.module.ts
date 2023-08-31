import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormConfig from './config/orm.config';
import { EventsModule } from './events/events.module';
import { AttendeesModule } from './attendees/attendees.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [ormConfig] }),
    TypeOrmModule.forRootAsync({
      useFactory: ormConfig,
    }),
    EventsModule,
    AttendeesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
