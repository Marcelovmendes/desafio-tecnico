import { Router } from 'express';
import participantsController from '../controllers/participants-controller';

const participantsRouter = Router();

participantsRouter.post('/participants', participantsController.postParticipants);
participantsRouter.get('/participants', participantsController.getParticipants);

export default participantsRouter;
