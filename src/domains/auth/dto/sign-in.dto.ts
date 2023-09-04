import { Length } from 'class-validator';

export class SignInDto {
  @Length(5, 20)
  username: string;
  password: string;
}
