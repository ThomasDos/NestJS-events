import { ToTrim } from '@/shared/decorator/to-trim.decorator';

export class CreateUserDto {
  @ToTrim
  username: string;

  password: string;
}
