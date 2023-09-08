import { faker } from '@faker-js/faker';
import { define } from 'typeorm-seeding';
import { Event } from '../../src/domains/events/entity/event.entity';

define(Event, (_, { user_id }) => {
  const event = new Event({
    id: faker.string.uuid(),
    address: faker.location.streetAddress(),
    event_date: faker.date.future(),
    description: faker.lorem.paragraph(),
    name: faker.lorem.words(),
    created_at: faker.date.past(),
    user_id: user_id,
  });

  return event;
});
