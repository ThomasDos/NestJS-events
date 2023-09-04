import { Attendee } from '@/domains/attendees/entity/attendee.entity';
import { User } from '@/domains/users/entity/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
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

  //MANY TO MANY RELATIONSHIP: EVENT AND ATTENDEE
  // @ManyToMany(() => Attendee, (attendee) => attendee.events, {
  //   cascade: true,
  // })
  // @JoinTable({
  //   name: 'event_attendee',
  //   joinColumn: { name: 'event_id', referencedColumnName: 'id' },
  //   inverseJoinColumn: { name: 'attendee_id', referencedColumnName: 'id' },
  // })
  // attendees?: Attendee[];

  @OneToMany(() => Attendee, (attendee) => attendee.event, {
    cascade: true,
  })
  attendees?: Attendee[];

  @ManyToOne(() => User, (user) => user.events)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  user_id: string;
}
