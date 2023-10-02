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

async function findParticipantByName(name: string) {
  const participant = await prisma.participant.findFirst({
    where: {
      name,
    },
  });
  return participant;
}
const participantsRepository = {
  createParticipants,
  findParticipantByName,
};

export default participantsRepository;
