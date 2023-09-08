import { faker } from '@faker-js/faker';
import { define } from 'typeorm-seeding';
import { Attendee } from '../../src/domains/attendees/entity/attendee.entity';

define(Attendee, (_, { user_id, event_id }) => {
  const event = new Attendee({
    id: faker.string.uuid(),
    user_id,
    event_id,
  });

  return event;
});
