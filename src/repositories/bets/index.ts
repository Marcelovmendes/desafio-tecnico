import { prisma } from '../../config/database';

async function createBet(
  homeTeamScore: number,
  awayTeamScore: number,
  amountInCents: number,
  gameId: number,
  participantId: number,
) {
  const bet = await prisma.bet.create({
    data: {
      homeTeamScore,
      awayTeamScore,
      amountBet: amountInCents,
      status: 'PENDING',
      game: { connect: { id: gameId } },
      participant: { connect: { id: participantId } },
    },
  });
  return bet;
}
async function getBetsByGame(id: number) {
  const bets = await prisma.bet.findMany({
    where: {
      gameId: id,
    },
  });
  return bets;
}
async function updateStatusBet(id: number, amountWon: number, status: string) {
  const bet = await prisma.bet.update({
    where: {
      id,
    },
    data: {
      updatedAt: new Date(),
      status,
      amountWon,
    },
  });
  return bet;
}
const betRepository = {
  createBet,
  getBetsByGame,
  updateStatusBet,
};

export default betRepository;
