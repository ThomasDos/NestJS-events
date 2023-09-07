import { Test } from '@nestjs/testing';
import { User } from '../users/entity/user.entity';
import { ListEventsDto } from './dto/list-events.dto';
import { EventsRepository } from './events.repository';
import { EventsService } from './events.service';

describe('EventsService', () => {
  let eventsService: EventsService;
  let eventsRepository: EventsRepository;

  const emptyListEventsDto = new ListEventsDto();

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        EventsService,
        {
          provide: EventsRepository,
          useValue: {
            getEventsWithAttendeeCountPaginated: jest.fn(),
            getEventsByUserIdPaginated: jest.fn(),
            getEvent: jest.fn(),
            createEvent: jest.fn(),
            updateEvent: jest.fn(),
            deleteEvent: jest.fn(),
          },
        },
      ],
    }).compile();

    eventsService = module.get<EventsService>(EventsService);
    eventsRepository = module.get<EventsRepository>(EventsRepository);
  });

  describe('getEvents', () => {
    it('should return a list of events', async () => {
      const result = {
        first: 1,
        last: 1,
        limit: 10,
        data: [],
      };

      jest
        .spyOn(eventsRepository, 'getEventsWithAttendeeCountPaginated')
        .mockImplementation((): any => result);
      expect(await eventsService.getEvents(emptyListEventsDto)).toEqual(result);
    });
  });

  describe('updateEvent', () => {
    it('should return an updated event', async () => {
      const result = {
        id: 1,
        title: 'title',
        description: 'description',
        date: new Date(),
        location: 'location',
        userId: 1,
      };

      const updateEventRepositorySpy = jest
        .spyOn(eventsRepository, 'updateEvent')
        .mockImplementation((): any => result);

      expect(await eventsService.updateEvent('1', result, '1')).toEqual(result);
      expect(updateEventRepositorySpy).toHaveBeenCalledWith('1', result, '1');
    });
  });

  describe('deleteEvent', () => {
    it('should return an empty object', async () => {
      const result = {};

      const deleteEventRepositorySpy = jest
        .spyOn(eventsRepository, 'deleteEvent')
        .mockImplementation((): any => result);

      expect(await eventsService.deleteEvent('1', '1')).toEqual(result);
      expect(deleteEventRepositorySpy).toHaveBeenCalledWith('1', '1');
    });

    it('should throw an error', async () => {
      const deleteEventRepositorySpy = jest
        .spyOn(eventsRepository, 'deleteEvent')
        .mockImplementation((): any => {
          throw new Error();
        });

      await expect(eventsService.deleteEvent('1', '1')).rejects.toThrowError();
      expect(deleteEventRepositorySpy).toHaveBeenCalledWith('1', '1');
    });
  });

  describe('getEvent', () => {
    it('should return an event', async () => {
      const result = {
        id: 1,
        title: 'title',
        description: 'description',
        date: new Date(),
        location: 'location',
        userId: 1,
      };

      const getEventRepositorySpy = jest
        .spyOn(eventsRepository, 'getEvent')
        .mockImplementation((): any => result);

      expect(await eventsService.getEvent('1')).toEqual(result);
      expect(getEventRepositorySpy).toHaveBeenCalledWith('1');
    });
  });

  describe('createEvent', () => {
    it('should return an event', async () => {
      const result = {
        id: '1',
        name: 'name',
        description: 'description',
        event_date: new Date(),
        address: 'address',
        user_id: '1',
      };

      const createEventRepositorySpy = jest
        .spyOn(eventsRepository, 'createEvent')
        .mockImplementation((): any => result);

      const newEvent = {
        name: 'name',
        description: 'description',
        event_date: new Date(),
        address: 'address',
      };

      const user = new User({ id: '1' });

      expect(await eventsService.createEvent(newEvent, user)).toEqual(result);
      expect(createEventRepositorySpy).toHaveBeenCalledWith(newEvent, {
        id: '1',
      });
    });
  });

  describe('getEventsByUserId', () => {
    it('should return a list of events', async () => {
      const result = {
        first: 1,
        last: 1,
        limit: 10,
        data: [],
      };

      jest
        .spyOn(eventsRepository, 'getEventsByUserIdPaginated')
        .mockImplementation((): any => result);
      expect(
        await eventsService.getEventsByUserIdPaginated('1', emptyListEventsDto),
      ).toEqual(result);
    });
  });
});
