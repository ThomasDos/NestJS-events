import { IsString, IsUUID, Length } from 'class-validator';
import { ToTrim } from 'src/shared/decorator/to-trim.decorator';

export class CreateAttendeeDto {
  @IsString()
  @Length(3, 50)
  @ToTrim
  name: string;

  @IsUUID()
  event_id: string;
}
