import { Transform } from 'class-transformer';
import { IsString, Length } from 'class-validator';

export class CreateAttendeeDto {
  @IsString()
  @Transform(({ value }) => value.toLowerCase())
  @Length(3, 50)
  name: string;
}
