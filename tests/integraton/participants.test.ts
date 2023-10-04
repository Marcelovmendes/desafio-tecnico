import supertest from 'supertest';
import app from '../../src/app';
import httpStatus from 'http-status';
import { faker } from '@faker-js/faker';
import { cleanDb } from '../healpers';
import { createParticipant } from '../factories/participants-factory';

const api = supertest(app);

beforeAll(async () => {
  await cleanDb();

});
beforeEach(async () => {
  await cleanDb();
})
describe('POST /participants', () => {
  it('Should respond with status 422 when body is not provided', async () => {
    const { status } = await api.post('/participants').send();
    expect(status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });
    it('Should respond with status 401 when balance is negative number', async () => {
      const name = faker.person.firstName();
    const { status } = await api.post('/participants').send({ name: name , balance: -100 });
    expect(status).toBe(httpStatus.UNAUTHORIZED);
  });
  it("SHould respond with status 409 if participant already exists", async () => {
    const name = faker.person.firstName();
    await createParticipant({ name, balance: 100 });
    const { status } = await api.post('/participants').send({ name: name , balance: 100 });
    expect(status).toBe(httpStatus.CONFLICT);
  })
  it('Should respond with status 201 when body is provided', async () => {
    const name = faker.person.firstName();
    const { status } = await api.post('/participants').send({ name: name , balance: 10000 });
    expect(status).toBe(httpStatus.CREATED);
  })
  it("Should respond with status 201 when participant is created", async () => {
    const name = faker.person.firstName();
    const { body,status } = await api.post('/participants').send({ name: name , balance: 10 });
    expect(body).toEqual({
      id: expect.any(Number),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
      name: name,
      balance: 1000,
    });
    expect(status).toBe(httpStatus.CREATED);
  })
})
describe('GET /participants', () => {
  it('Should respond with status 404 when participants are not found', async () => {
    const { status } = await api.get('/participants');
    expect(status).toBe(httpStatus.NOT_FOUND);
  })

  it("Should respond with status 200 when participants are found", async () => {
    await createParticipant({ name: faker.person.firstName(), balance: 1000 });
    const { body,status } = await api.get('/participants');
    expect(body).toEqual([{
      id: expect.any(Number),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
      name: expect.any(String),
      balance: expect.any(Number),
    }]);
    expect(status).toBe(httpStatus.OK);
  })
})