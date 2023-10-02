import { Router } from 'express';
import gamesController from '../controllers/games-controller';

const gamesRouter = Router();

gamesRouter.post('/games', gamesController.createGame);

export default gamesRouter;
