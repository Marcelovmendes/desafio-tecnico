import { Bet, Game } from '@prisma/client';
import gamesRepository from '../../repositories/games';
import { conflictError, missingFiledsError, notFoundError } from '../../errors';
import betRepository from '../../repositories/bets';
import participantsRepository from '../../repositories/participants-repository.ts';
import { BetAccumulator, CreateGameParams, FinishGameParams } from '../../protocols';

async function postGame({ homeTeamName, awayTeamName }: CreateGameParams) {
  await checkGame({ homeTeamName, awayTeamName });

  const game = await gamesRepository.createGame(homeTeamName, awayTeamName);
  return game;
}
async function getGames() {
  const games = await gamesRepository.getGames();
  if (games.length === 0) throw notFoundError('No games found');
  return games;
}
export async function finishGame({ homeTeamScore, awayTeamScore, id }: FinishGameParams) {
  const game = await gamesRepository.findGameById(id);
  if (!game) throw notFoundError('Game not found');
  if (game.isFinished) throw conflictError('Game already finished');

  const result = await gamesRepository.updateGameScore(homeTeamScore, awayTeamScore, id);
  const bets = await betRepository.getBetsByGame(id);

  const { totalAmount, totalWin } = bets.reduce(
    (acc: BetAccumulator, bet: Bet) => {
      const { amountWon, status } = calculateAmountWon(
        homeTeamScore,
        awayTeamScore,
        bet.homeTeamScore,
        bet.awayTeamScore,
        bet.amountBet,
      );

      if (status === 'WON') {
        acc.totalAmount += amountWon;
        acc.totalWin += amountWon;
      }
      if (status === 'LOST') {
        acc.totalAmount += amountWon;
      }
      return acc;
    },
    { totalAmount: 0, totalWin: 0 },
  );

  const houseFee = 0.3;
  const updatePromises = bets.map(async (bet) => {
    const { amountWon, status } = calculateAmountWon(
      homeTeamScore,
      awayTeamScore,
      bet.homeTeamScore,
      bet.awayTeamScore,
      bet.amountBet,
    );

    if (status === 'WON') {
      const amount = (amountWon / totalWin) * totalAmount * (1 - houseFee);
      await betRepository.updateStatusBet(bet.id, amount, status);
      await participantsRepository.updateParticipantBalance(bet.participantId, amount);
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
    amountWon = amountBet;
    status = 'WON';
  } else {
    amountWon = amountBet;
    status = 'LOST';
  }

  return { amountWon, status };
}

const gamesService = {
  postGame,
  finishGame,
  getGames,
};
export default gamesService;
