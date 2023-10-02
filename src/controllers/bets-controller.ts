import { Bet } from '@prisma/client';
import { Response, Request } from 'express';
import httpStatus from 'http-status';
import betService from '../services/bet-service';

async function createBet(req: Request, res: Response) {
  const { homeTeamScore, awayTeamScore, amountBet, gameId, participantId } = req.body as CreateBetParams;

  const bet = await betService.postBet({ homeTeamScore, awayTeamScore, amountBet, gameId, participantId });

  res.status(httpStatus.CREATED).send(bet);
}
export type CreateBetParams = Omit<Bet, 'id' | 'createdAt' | 'updatedAt' | 'status' | 'amountWon'>;

const betsController = {
  createBet,
};

export default betsController;
