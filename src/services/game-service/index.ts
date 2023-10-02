import { Game } from '@prisma/client';
import gamesRepository from '../../repositories/games';
import { conflictError, missingFiledsError, notFoundError } from '../../errors';
import betRepository from '../../repositories/bets';
import participantsRepository from '../../repositories/participants-repository.ts';

async function postGame({ homeTeamName, awayTeamName }: CreateGameParams) {
  await checkGame({ homeTeamName, awayTeamName });

  const game = await gamesRepository.createGame(homeTeamName, awayTeamName);
  return game;
}
export async function finishGame({ homeTeamScore, awayTeamScore, id }: FinishGameParams) {
  const game = await gamesRepository.findGameById(id);
  if (!game) throw notFoundError('Game not found');
  if (game.isFinished) throw conflictError('Game already finished');

  const result = await gamesRepository.updateGameScore(homeTeamScore, awayTeamScore, id);
  const bets = await betRepository.getBetsByGame(id);

  const updatePromises = bets.map(async (bet) => {
    const amount = calculateAmountWon(
      homeTeamScore,
      awayTeamScore,
      bet.homeTeamScore,
      bet.awayTeamScore,
      bet.amountBet,
    );

    await betRepository.updateStatusBet(bet.id, amount.amountWon, amount.status);

    if (amount.amountWon > 0) {
      await participantsRepository.updateParticipantBalance(bet.participantId, amount.amountWon);
    }
  });

  await Promise.all(updatePromises);

  return result;
}

export async function checkGame(game: CreateGameParams) {
  if (!game.homeTeamName || !game.awayTeamName) throw missingFiledsError('Missing fields in game');

  const homeInGame = await gamesRepository.IsTeamInGame(game.homeTeamName);
  if (homeInGame.length > 0 && !homeInGame[0].isFinished) throw conflictError('HomeTeam already in game');

  const awayInGame = await gamesRepository.IsTeamInGame(game.awayTeamName);
  if (awayInGame.length > 0 && !awayInGame[0].isFinished) throw conflictError('AwayTeam already in game');
}

export function calculateAmountWon(
  homeTeamFinalScore: number,
  awayTeamFinalScore: number,
  betHomeTeamScore: number,
  betAwayTeamScore: number,

  amountBet: number,
) {
  let amountWon = 0;
  let status;
  if (homeTeamFinalScore === betHomeTeamScore && awayTeamFinalScore === betAwayTeamScore) {
    amountWon = amountBet * 2.0;
    status = 'WON';
  } else if (homeTeamFinalScore != betHomeTeamScore && awayTeamFinalScore != betAwayTeamScore) {
    amountWon = amountBet;
    status = 'LOST';
  }
  return { amountWon, status };
}

export type CreateGameParams = Pick<Game, 'homeTeamName' | 'awayTeamName'>;
export type FinishGameParams = Omit<Game, 'updatedAt' | 'createdAt' | 'homeTeamName' | 'awayTeamName' | 'isFinished'>;
const gamesService = {
  postGame,
  finishGame,
};
export default gamesService;
