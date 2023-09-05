import { ToTrim } from '@/shared/decorators/to-trim.decorator';
import { IsString, IsUUID, Length } from 'class-validator';

export class CreateAttendeeDto {
  @IsString()
  @Length(3, 50)
  @ToTrim
  name: string;

  @IsUUID()
  event_id: string;
}
