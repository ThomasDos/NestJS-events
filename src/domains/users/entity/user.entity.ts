import { Exclude } from 'class-transformer';
import { IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsString()
  username: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;
}
