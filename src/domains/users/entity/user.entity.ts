import { Attendee } from '@domains/attendees/entity/attendee.entity';
import { Event } from '@domains/events/entity/event.entity';
import { Expose } from 'class-transformer';
import { IsBoolean, IsString } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
  @PrimaryGeneratedColumn('uuid')
  @Expose()
  id: string;

  @Column({ unique: true })
  @Expose()
  @IsString()
  username: string;

  @Column({ default: false })
  @Expose()
  @IsBoolean()
  is_admin: boolean;

  @Column()
  password: string;

  @Expose()
  @OneToMany(() => Event, (event) => event.user, { cascade: true })
  events?: Event[];

  @Expose()
  @OneToMany(() => Attendee, (attendee) => attendee.event, {
    cascade: true,
  })
  attendees?: Attendee[];
}
