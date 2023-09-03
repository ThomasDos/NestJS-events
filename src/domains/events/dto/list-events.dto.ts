import { IsBooleanString, IsOptional } from 'class-validator';

export class ListEventsDto {
  when?: WHEN_EVENT_FILTER = WHEN_EVENT_FILTER.ALL;
  limit = 10;
  current_page = 1;
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
