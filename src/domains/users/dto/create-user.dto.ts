import { ToTrim } from '@/shared/decorators/to-trim.decorator';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsBooleanString, IsOptional, Length, Matches } from 'class-validator';

export class CreateUserDto {
  @ToTrim
  @Length(5, 20)
  @ApiProperty({ type: String, minLength: 5, maxLength: 20 })
  username: string;

  @IsBooleanString()
  @IsOptional()
  @ApiProperty({ type: Boolean, required: false })
  is_admin: boolean;

  @Exclude({ toPlainOnly: true })
  @Length(8, 40)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Password must contain at least 8 characters, one uppercase, one lowercase and one number',
  })
  @ApiProperty({
    pattern: '/((?=.*d)|(?=.*W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/',
  })
  password: string;
}
