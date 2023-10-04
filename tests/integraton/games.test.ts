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