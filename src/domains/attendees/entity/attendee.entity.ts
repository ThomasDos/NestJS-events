import { Event } from '@domains/events/entity/event.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

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

  @ManyToMany(() => Event, (event) => event.attendees)
  events?: Event[];
}