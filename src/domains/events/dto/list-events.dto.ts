export class ListEventsDto {
  when?: WHEN_EVENT_FILTER = WHEN_EVENT_FILTER.ALL;
}

export enum WHEN_EVENT_FILTER {
  ALL = 'ALL',
  TODAY = 'TODAY',
  TOMORROW = 'TOMORROW',
  THIS_WEEK = 'THIS_WEEK',
  NEXT_WEEK = 'NEXT_WEEK',
}
