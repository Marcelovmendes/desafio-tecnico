import { Bet } from '@prisma/client';
import betRepository from '../../repositories/bets';
import { invalidAmountError, missingFiledsError, notFoundError } from '../../errors';
import gamesRepository from '../../repositories/games';
import participantsRepository from '../../repositories/participants-repository.ts';

async function postBet({ homeTeamScore, awayTeamScore, amountBet, gameId, participantId }: checkBetParams) {
  await validateBet({ homeTeamScore, awayTeamScore, amountBet, gameId, participantId });

  const amountInCents = amountBet * 100;

  const partcipant = await participantsRepository.findParticipantById(participantId);
  if (partcipant.balance < amountInCents) throw invalidAmountError('Insufficient balance');

  const bet = await betRepository.createBet(homeTeamScore, awayTeamScore, amountInCents, gameId, participantId);

  await participantsRepository.updateParticipantBalance(participantId, -amountInCents);
  return bet;
}

export type checkBetParams = Pick<Bet, 'homeTeamScore' | 'awayTeamScore' | 'amountBet' | 'gameId' | 'participantId'>;
const betService = {
  postBet,
};

export async function validateBet(bet: checkBetParams) {
  if (!bet.homeTeamScore || !bet.awayTeamScore || !bet.gameId || !bet.participantId)
    throw missingFiledsError('Missing fields in bet');

  const balanceParticipant = await participantsRepository.findParticipantById(bet.participantId);
  if (!bet.amountBet || bet.amountBet < 0 || bet.amountBet > balanceParticipant.balance)
    throw invalidAmountError('Invalid amount in bet');

  const game = await gamesRepository.findGameById(bet.gameId);
  if (game.isFinished) throw notFoundError('Game is finished');

  const gameExists = await gamesRepository.findGameById(bet.gameId);
  if (!gameExists) throw notFoundError('Game not found');

  if (gameExists.isFinished) throw notFoundError('Game is finished');
}
export default betService;
