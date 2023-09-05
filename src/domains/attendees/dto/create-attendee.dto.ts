import { ToTrim } from '@/shared/decorators/to-trim.decorator';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, Length } from 'class-validator';

export class CreateAttendeeDto {
  @IsString()
  @Length(3, 50)
  @ToTrim
  @ApiProperty()
  name: string;

  @IsUUID()
  @ApiProperty()
  event_id: string;
}
