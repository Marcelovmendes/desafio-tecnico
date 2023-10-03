import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function cleanDB() {
  await prisma.participant.deleteMany();
  await prisma.game.deleteMany();
  await prisma.bet.deleteMany();
}
