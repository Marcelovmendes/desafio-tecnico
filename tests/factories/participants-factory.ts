import { prisma } from '@/config/database';
import { faker } from '@faker-js/faker';

export function createParticipant({ name, balance }: { name: string; balance: number }) {
  return prisma.participant.create({
    data: {
      name: faker.person.firstName() || name,
      balance: faker.number.int({ min: 10 }) || balance,
    },
  });
}
