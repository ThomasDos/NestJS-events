import { ToTrim } from '@/shared/decorator/to-trim.decorator';
import { Exclude } from 'class-transformer';

export class CreateUserDto {
  @ToTrim
  username: string;

  @Exclude({ toPlainOnly: true })
  password: string;
}
