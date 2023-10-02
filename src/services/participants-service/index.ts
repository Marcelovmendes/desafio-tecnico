import { Participant } from '@prisma/client';
import { conflictError, invalidAmountError, missingFiledsError, notFoundError } from '../../errors/index';
import participantsRepository from '../../repositories/participants-repository.ts';

async function createParticipant({ name, balance }: CreateParticipantParams): Promise<Participant> {
  await validateParticipant({ name, balance });
  const balanceInCents = balance * 100;
  if (balance < 10) throw invalidAmountError('Balance cannot be less than R$10,00');
  const participant = await participantsRepository.createParticipants(name, balanceInCents);

  return participant;
}
async function findManyParticipants() {
  const participants = await participantsRepository.getParticipants();
  if (participants.length === 0) throw notFoundError('No participants found');
  return participants;
}
const participantsService = {
  createParticipant,
  findManyParticipants,
};

export async function validateParticipant(participant: CreateParticipantParams) {
  if (!participant.name || !participant.balance) throw missingFiledsError('Missing fields in participant');

  if (participant.balance < 0) throw missingFiledsError('Balance cannot be negative');

  const participantAlreadyExists = await participantsRepository.findParticipantByName(participant.name);

  if (participantAlreadyExists) throw conflictError('Participant already exists');
}

export type CreateParticipantParams = Pick<Participant, 'name' | 'balance'>;
export default participantsService;
