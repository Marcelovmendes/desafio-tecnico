import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createParticipant({ name, balance }: { name: string; balance: number }) {
  const participant= await prisma.participant.create({
    data: {
      name: faker.person.firstName() || name,
      balance: faker.number.int({ min:10,max:20 }) || balance,
    },
  });
  return participant;
}
