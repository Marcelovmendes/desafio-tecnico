import { Request, Response } from 'express';
import participantsService from '../services/participants-service';
import httpStatus from 'http-status';
async function PostParticipants(req: Request, res: Response) {
  const { name, balance } = req.body;

  const participant = await participantsService.createParticipant(name, balance);

  res.status(httpStatus.CREATED).send(participant);
}
