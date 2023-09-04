import { Exclude } from 'class-transformer';
import { IsBoolean, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  @IsString()
  username: string;

  @Column({ default: false })
  @IsBoolean()
  is_admin: boolean;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;
}
