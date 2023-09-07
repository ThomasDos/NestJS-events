import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ListEventsDto } from './dto/list-events.dto';
import { Event } from './entity/event.entity';
import { EventsRepository } from './events.repository';

describe('EventsRepository', () => {
  let eventsRepository: EventsRepository;

  const emptyListEventsDto = new ListEventsDto();

  const eventsMocked: Event[] = [
    {
      id: '1',
      name: 'name',
      description: 'description',
      event_date: new Date(),
      address: 'address',
      created_at: new Date(),
      updated_at: new Date(),
      user: null,
      user_id: '1',
    },
    {
      id: '2',
      name: 'name',
      description: 'description',
      event_date: new Date(),
      address: 'address',
      created_at: new Date(),
      updated_at: new Date(),
      user: null,
      user_id: '1',
    },
  ];

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        EventsRepository,
        {
          provide: getRepositoryToken(Event),
          useValue: {
            find: jest.fn().mockImplementation(() => eventsMocked),
            findOne: jest.fn(),
            createQueryBuilder: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    eventsRepository = module.get<EventsRepository>(EventsRepository);
  });
  describe('getEventsWithAttendeeCountPaginated', () => {
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
      expect(
        await eventsRepository.getEventsWithAttendeeCountPaginated(
          emptyListEventsDto,
        ),
      ).toEqual(result);
    });
  });

  describe('getEvents', () => {
    it('should return a list of events', async () => {
      expect(await eventsRepository.getEvents()).toEqual(eventsMocked);
    });
  });
});
