import { Request, Response } from 'express';
import httpStatus from 'http-status';
import gamesService from '../services/game-service';
import { Game } from '@prisma/client';

async function createGame(req: Request, res: Response) {
  const { homeTeamName, awayTeamName } = req.body as { homeTeamName: string; awayTeamName: string };

  const game = await gamesService.postGame({ homeTeamName, awayTeamName });

  res.status(httpStatus.CREATED).send(game);
}
async function getGames(req: Request, res: Response) {
  const games = await gamesService.getGames();

  res.status(httpStatus.OK).send(games);
}
async function finishedGame(req: Request, res: Response) {
  const { homeTeamScore, awayTeamScore } = req.body as { homeTeamScore: number; awayTeamScore: number };
  const id = parseInt(req.params.id);
  const game = await gamesService.finishGame({ homeTeamScore, awayTeamScore, id });

  res.status(httpStatus.OK).send(game);
}

const gamesController = {
  createGame,
  finishedGame,
  getGames,
};

export default gamesController;
