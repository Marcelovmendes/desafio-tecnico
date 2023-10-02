import { Participant } from '@prisma/client';
import { conflictError, missingFiledsError } from '../../errors/index';
import participantsRepository from '../../repositories/participants-repository.ts';

async function createParticipant({ name, balance }: CreateParticipantParams): Promise<Participant> {
  await validateParticipant({ name, balance });
  const balanceInCents = balance * 100;
  const participant = await participantsRepository.createParticipants(name, balanceInCents);

  return participant;
}

const participantsService = {
  createParticipant,
};

export async function validateParticipant(participant: CreateParticipantParams) {
  if (!participant.name || !participant.balance) throw missingFiledsError('Missing fields in participant');

  if (participant.balance < 0) throw missingFiledsError('Balance cannot be negative');

  const participantAlreadyExists = await participantsRepository.findParticipantByName(participant.name);

  if (participantAlreadyExists) throw conflictError('Participant already exists');
}

export type CreateParticipantParams = Pick<Participant, 'name' | 'balance'>;
export default participantsService;
