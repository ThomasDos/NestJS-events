import { Factory, Seeder } from 'typeorm-seeding';
import { Event } from '../../src/domains/events/entity/event.entity';
import { User } from '../../src/domains/users/entity/user.entity';

export default class DBSeed implements Seeder {
  public async run(factory: Factory): Promise<any> {
    const users = await factory(User)().createMany(10);

    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      await factory(Event)({ user_id: user.id }).create();
    }
  }
}
