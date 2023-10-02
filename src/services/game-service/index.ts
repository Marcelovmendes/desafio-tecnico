import { Game } from '@prisma/client';
import gamesRepository from '../../repositories/games';
import { conflictError, missingFiledsError } from '../../errors';

async function postGame({ homeTeamName, awayTeamName }: CreateGameParams) {
  await checkGame({ homeTeamName, awayTeamName });

  const game = await gamesRepository.createGame(homeTeamName, awayTeamName);
  return game;
}

const gamesService = {
  postGame,
};

export async function checkGame(game: CreateGameParams) {
  if (!game.homeTeamName || !game.awayTeamName) throw missingFiledsError('Missing fields in game');

  const homeInGame = await gamesRepository.IsTeamInGame(game.homeTeamName);
  if (homeInGame.length > 0 && !homeInGame[0].isFinished) throw conflictError('HomeTeam already in game');

  const awayInGame = await gamesRepository.IsTeamInGame(game.awayTeamName);
  if (awayInGame.length > 0 && !awayInGame[0].isFinished) throw conflictError('AwayTeam already in game');
}
export type CreateGameParams = Pick<Game, 'homeTeamName' | 'awayTeamName'>;
export default gamesService;
