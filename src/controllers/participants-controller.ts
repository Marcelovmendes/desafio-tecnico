import { Request, Response } from 'express';
import participantsService from '../services/participants-service';
import httpStatus from 'http-status';
async function postParticipants(req: Request, res: Response) {
  const { name, balance } = req.body as { name: string; balance: number };
  const participant = await participantsService.createParticipant({ name, balance });
  res.status(httpStatus.CREATED).send(participant);

}
async function getParticipants(req: Request, res: Response) {
try{
  const participants = await participantsService.findManyParticipants()
  res.status(httpStatus.OK).send(participants);
}catch(error){
  res.status(httpStatus.BAD_REQUEST).send({
    message: error.message,
  });   

}
}
const participantsController = {
  postParticipants,
  getParticipants,
};

export default participantsController;
