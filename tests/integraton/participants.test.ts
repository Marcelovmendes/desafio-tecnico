import supertest from 'supertest';
import app, { init } from '../../src/app';
import httpStatus from 'http-status';

import { cleanDB } from '../healpers';
//import { connectDb } from '../config/database';

const api = supertest(app);

beforeAll(async () => {
  await init();
  await cleanDB();
});

describe('POST /participants', () => {
  it('Should respond with status 422 when body is not provided', async () => {
    const { status } = await api.post('/participants').send();
    expect(status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });
});
