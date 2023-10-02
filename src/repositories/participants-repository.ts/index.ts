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

const participantsRepository = {
  createParticipants,
};

export default participantsRepository;
