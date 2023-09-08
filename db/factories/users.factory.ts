import { faker } from '@faker-js/faker';
import { define } from 'typeorm-seeding';
import { User } from '../../src/domains/users/entity/user.entity';

define(User, () => {
  const user = new User({
    id: faker.string.uuid(),
    username: faker.internet.userName(),
    password: faker.internet.password(),
    is_admin: true,
  });

  return user;
});
