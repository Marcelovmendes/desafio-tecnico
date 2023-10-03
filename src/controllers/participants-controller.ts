import { Request, Response } from 'express';
import participantsService from '../services/participants-service';
import httpStatus from 'http-status';
import { missingFiledsError } from '../errors';
async function postParticipants(req: Request, res: Response) {

  const { name, balance } = req.body as { name: string; balance: number };
  if (!name || !balance || (!name && !balance)) throw missingFiledsError('Missing fields in participant');

  const participant = await participantsService.createParticipant({ name, balance });
  res.status(httpStatus.CREATED).send(participant);

}
async function getParticipants(req: Request, res: Response) {

  const participants = await participantsService.findManyParticipants()
  res.status(httpStatus.OK).send(participants);

}
const participantsController = {
  postParticipants,
  getParticipants,
};

export default participantsController;
