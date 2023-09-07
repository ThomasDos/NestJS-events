import { Attendee } from './attendee.entity';

describe('AttendeeEntity', () => {
  it('should be initialized with the constructor', () => {
    const attendee = new Attendee({ name: 'John Doe' });

    expect(attendee).toEqual({
      name: 'John Doe',
      id: undefined,
      event: undefined,
      event_id: undefined,
      user: undefined,
      user_id: undefined,
    });
  });
});
