import { Participant } from '@prisma/client';
import { conflictError, missingFiledsError } from '../../errors/index';
import participantsRepository from '../../repositories/participants-repository.ts';

async function createParticipant({ name, balance }: CreateParticipantParams): Promise<Participant> {
  if (!name || !balance) throw missingFiledsError('Missing fields');

  const participantAlreadyExists = await participantsRepository.findParticipantByName(name);

  if (participantAlreadyExists) throw conflictError('Participant already exists');

  const participant = await participantsRepository.createParticipants(name, balance);

  return participant;
}

const participantsService = {
  createParticipant,
};

export type CreateParticipantParams = Pick<Participant, 'name' | 'balance'>;
export default participantsService;
