import { Router } from 'express';
import gamesController from '../controllers/games-controller';

const gamesRouter = Router();

gamesRouter.post('/games', gamesController.createGame);
gamesRouter.post('/games/:id', gamesController.finishedGame);
gamesRouter.get('/games', gamesController.getGames);

export default gamesRouter;
