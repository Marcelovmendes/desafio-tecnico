import participantsRepository from '../../repositories/participants-repository.ts';

async function createParticipant(name: string, balance: number) {
  const participant = await participantsRepository.createParticipants(name, balance);

  return participant;
}

const participantsService = {
  createParticipant,
};

export default participantsService;
