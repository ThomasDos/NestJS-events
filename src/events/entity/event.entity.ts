import { Attendee } from 'src/attendees/entity/attendee.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  name: string;

  @Column()
  description: string;

  @Column()
  event_date: Date;

  @Column()
  address: string;

  @Column({ default: new Date() })
  created_at: Date;

  @Column({ nullable: true })
  updated_at: Date;

  @ManyToMany(() => Attendee, (attendee) => attendee.events, {
    cascade: true,
  })
  @JoinTable({
    name: 'event_attendee',
    joinColumn: { name: 'event_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'attendee_id', referencedColumnName: 'id' },
  })
  attendees?: Attendee[];
}
