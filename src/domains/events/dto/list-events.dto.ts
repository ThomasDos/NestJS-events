import { ApiProperty } from '@nestjs/swagger';
import { IsBooleanString, IsOptional } from 'class-validator';

export class ListEventsDto {
  @ApiProperty({ type: Date, required: false })
  when?: WHEN_EVENT_FILTER = WHEN_EVENT_FILTER.ALL;

  @ApiProperty({ type: Number, required: false })
  limit = 10;

  @ApiProperty({ type: Number, required: false })
  current_page = 1;

  @ApiProperty({ type: Boolean, required: false })
  @IsBooleanString()
  @IsOptional()
  total?: boolean;
}

export enum WHEN_EVENT_FILTER {
  ALL = 'ALL',
  TODAY = 'TODAY',
  TOMORROW = 'TOMORROW',
  THIS_WEEK = 'THIS_WEEK',
  NEXT_WEEK = 'NEXT_WEEK',
}
