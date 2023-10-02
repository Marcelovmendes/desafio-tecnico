export type ApplicationError = {
  name: string;
  message: string;
};
export type Bet = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  homeTeamScore: number;
  awayTeamScore: number;
  amountBet: number;
  gameId: number;
  participantId: number;
  status: string;
  amountWon: number;
};

export type BetAccumulator = {
  totalAmount: number;
  totalWin: number;
};
export type CreateGameParams = Pick<Game, 'homeTeamName' | 'awayTeamName'>;
export type FinishGameParams = Omit<Game, 'updatedAt' | 'createdAt' | 'homeTeamName' | 'awayTeamName' | 'isFinished'>;
