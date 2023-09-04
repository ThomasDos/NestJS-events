import { Event } from '@/domains/events/entity/event.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export enum AttendeeAnswerEnum {
  ACCEPTED = 'ACCEPTED',
  MAYBE = 'MAYBE',
  REJECTED = 'REJECTED',
}
@Entity()
export class Attendee {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  // MANY TO MANY RELATIONSHIP: EVENT AND ATTENDEE
  // @ManyToMany(() => Event, (event) => event.attendees)
  // events?: Event[];

  @ManyToOne(() => Event, (event) => event.attendees)
  event?: Event;
}
