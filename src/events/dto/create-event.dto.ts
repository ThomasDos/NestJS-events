import { Transform } from 'class-transformer';
import { IsDateString, IsString, Length } from 'class-validator';

export class CreateEventDto {
  @IsString()
  @Length(5, 255, {
    message:
      'Name must be at least 5 characters long and maximum 255 characters long.',
  })
  @Transform(({ value }) => value.trim())
  name: string;
  @IsString()
  description: string;
  @IsDateString()
  event_date: Date;
  @IsString()
  address: string;
}
