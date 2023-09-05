import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';

export class SignInDto {
  @Length(5, 20)
  @ApiProperty()
  username: string;
  @ApiProperty()
  password: string;
}
