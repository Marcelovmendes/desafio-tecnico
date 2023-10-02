import prisma from '../../config/database';

async function createParticipants(name: string, balance: number) {
  const participant = await prisma.participant.create({
    data: {
      name,
      balance,
    },
  });
  return participant;
}
async function getParticipants() {
  const participants = await prisma.participant.findMany();
  return participants;
}
async function findParticipantByName(name: string) {
  const participant = await prisma.participant.findFirst({
    where: {
      name,
    },
  });
  return participant;
}
async function findParticipantById(id: number) {
  const participant = await prisma.participant.findFirst({
    where: {
      id,
    },
  });
  return participant;
}
async function updateParticipantBalance(id: number, balance: number) {
  const amountToAdd = balance;
  const participant = await prisma.participant.update({
    where: {
      id,
    },
    data: {
      balance: {
        increment: amountToAdd,
      },
    },
  });
  return participant;
}
const participantsRepository = {
  createParticipants,
  findParticipantByName,
  updateParticipantBalance,
  getParticipants,
  findParticipantById,
};

export default participantsRepository;
