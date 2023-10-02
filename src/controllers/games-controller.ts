import { Request, Response } from 'express';
import httpStatus from 'http-status';
import gamesService from '../services/game-service';

async function createGame(req: Request, res: Response) {
  const { homeTeamName, awayTeamName } = req.body as { homeTeamName: string; awayTeamName: string };

  const game = await gamesService.postGame({ homeTeamName, awayTeamName });

  res.status(httpStatus.CREATED).send(game);
}

const gamesController = {
  createGame,
};

export default gamesController;
