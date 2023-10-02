import { Router } from 'express';
import betsController from '../controllers/bets-controller';

const betRouter = Router();

betRouter.post('/bets', betsController.createBet);

export default betRouter;
