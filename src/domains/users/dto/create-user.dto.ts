import { ToTrim } from '@/shared/decorator/to-trim.decorator';
import { Exclude } from 'class-transformer';
import { IsBooleanString, Length, Matches } from 'class-validator';

export class CreateUserDto {
  @ToTrim
  @Length(5, 20)
  username: string;

  @IsBooleanString()
  is_admin = false;

  @Exclude({ toPlainOnly: true })
  @Length(8, 40)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
    message:
      'Password must contain at least 8 characters, one uppercase, one lowercase and one number',
  })
  password: string;
}
