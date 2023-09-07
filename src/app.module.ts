import ormConfig from '@config/orm.config';
import { AttendeesModule } from '@domains/attendees/attendees.module';
import { AuthModule } from '@domains/auth/auth.module';
import { EventsModule } from '@domains/events/events.module';
import { UsersModule } from '@domains/users/users.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [ormConfig] }),
    TypeOrmModule.forRootAsync({
      useFactory: ormConfig,
    }),
    EventsModule,
    AttendeesModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
