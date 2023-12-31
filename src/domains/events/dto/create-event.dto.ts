import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDateString, IsString, Length } from 'class-validator';

export class CreateEventDto {
  @IsString()
  @Length(5, 255, {
    message:
      'Name must be at least 5 characters long and maximum 255 characters long.',
  })
  @Transform(({ value }) => value.trim())
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  description: string;

  @IsDateString()
  @ApiProperty()
  event_date: Date;

  @IsString()
  @ApiProperty()
  address: string;
}
