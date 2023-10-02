import { Router } from 'express';
import participantsController from '../controllers/participants-controller';

const participantsRouter = Router();

participantsRouter.post('/participants', participantsController.postParticipants);

export default participantsRouter;
