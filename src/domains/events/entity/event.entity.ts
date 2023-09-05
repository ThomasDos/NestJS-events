import { Attendee } from '@/domains/attendees/entity/attendee.entity';
import { User } from '@/domains/users/entity/user.entity';
import { Expose } from 'class-transformer';
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
  constructor(partial: Partial<Event>) {
    Object.assign(this, partial);
  }
  @PrimaryGeneratedColumn('uuid')
  @Expose()
  id: string;

  @Column({ length: 255 })
  @Expose()
  name: string;

  @Column()
  @Expose()
  description: string;

  @Column()
  @Expose()
  event_date: Date;

  @Column()
  @Expose()
  address: string;

  @Column({ default: new Date() })
  @Expose()
  created_at: Date;

  @Column({ nullable: true })
  @Expose()
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

  @Expose()
  @OneToMany(() => Attendee, (attendee) => attendee.event, {
    cascade: true,
  })
  attendees?: Attendee[];

  @Expose()
  @ManyToOne(() => User, (user) => user.events)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Expose()
  @Column()
  user_id: string;
}
