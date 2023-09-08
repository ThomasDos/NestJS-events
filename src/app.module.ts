import { configValidationSchema } from '@config/config.schema';
import ormConfig from '@config/orm.config';
import { AttendeesModule } from '@domains/attendees/attendees.module';
import { AuthModule } from '@domains/auth/auth.module';
import { EventsModule } from '@domains/events/events.module';
import { UsersModule } from '@domains/users/users.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.STAGE}`,
      load: [ormConfig],
      validationSchema: configValidationSchema,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: ormConfig,
    }),
    EventsModule,
    AttendeesModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
