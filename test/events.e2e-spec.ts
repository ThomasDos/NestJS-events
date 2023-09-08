import { AppModule } from '@/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

describe('Events (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/events (GET) should respond with an array of events', () => {
    return request(app.getHttpServer())
      .get('/events')
      .query({
        when: 'ALL',
        limit: 10,
        current_page: 1,
      })
      .expect(200)
      .then((res) => {
        console.log('res.body', res.body);
        expect(res.body).toBeInstanceOf(Array);
      });
  });
});
