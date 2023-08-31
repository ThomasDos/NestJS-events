import { Transform } from 'class-transformer';
import { IsString, Length } from 'class-validator';

export class CreateAttendeeDto {
  @IsString()
  @Length(3, 50)
  @Transform(({ value }) => value.trim(), { toClassOnly: true })
  name: string;
}
