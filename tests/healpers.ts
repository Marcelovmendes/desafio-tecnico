import prisma from '@/config/database';

export async function cleanDB() {
  await prisma.participant.deleteMany();
  await prisma.game.deleteMany();
  await prisma.bet.deleteMany();
}
