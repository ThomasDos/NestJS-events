import { ListEventsDto } from './dto/list-events.dto';
import { EventsController } from './events.controller';
import { EventsRepository } from './events.repository';
import { EventsService } from './events.service';

describe('EventsController', () => {
  let eventsController: EventsController;
  let eventsService: EventsService;
  let eventsRepository: EventsRepository;

  beforeEach(() => {
    eventsService = new EventsService(eventsRepository);
    eventsController = new EventsController(eventsService);
  });

  it('should return a list of events', () => {
    const listEventsDto = new ListEventsDto();
    const result = {
      first: 1,
      last: 1,
      limit: 10,
      data: [],
    };

    const getEventsSpy = jest
      .spyOn(eventsService, 'getEvents')
      .mockImplementation((): any => result);

    expect(eventsController.getEvents(listEventsDto)).toEqual(result);
    expect(getEventsSpy).toHaveBeenCalledWith(listEventsDto);
    expect(getEventsSpy).toHaveBeenCalledTimes(1);
  });

  it('should delete an event', () => {
    const result = undefined;
    const deleteEventSpy = jest
      .spyOn(eventsService, 'deleteEvent')
      .mockImplementation((): any => result);
    expect(eventsController.removeEvent('1', { id: '1' })).toEqual(result);
    expect(deleteEventSpy).toHaveBeenCalledWith('1', '1');
    expect(deleteEventSpy).toHaveBeenCalledTimes(1);
  });
});
