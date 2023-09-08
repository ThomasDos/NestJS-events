import { Event } from '@domains/events/entity/event.entity';
import { User } from '@domains/users/entity/user.entity';
import { Expose } from 'class-transformer';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum AttendeeAnswerEnum {
  ACCEPTED = 'ACCEPTED',
  MAYBE = 'MAYBE',
  REJECTED = 'REJECTED',
}
@Entity()
export class Attendee {
  @PrimaryGeneratedColumn('uuid')
  @Expose()
  id: string;

  // MANY TO MANY RELATIONSHIP: EVENT AND ATTENDEE
  // @ManyToMany(() => Event, (event) => event.attendees)
  // events?: Event[];

  @ManyToOne(() => Event, (event) => event.attendees)
  @JoinColumn({ name: 'event_id' })
  @Expose()
  event: Event;

  @Column()
  @Expose()
  event_id: string;

  @ManyToOne(() => User, (user) => user.attendees)
  @JoinColumn({ name: 'user_id' })
  @Expose()
  user: User;

  @Column()
  @Expose()
  user_id: string;

  constructor(partial?: Partial<Attendee>) {
    Object.assign(this, partial);
  }
}
