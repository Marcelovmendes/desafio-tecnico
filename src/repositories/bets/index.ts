import prisma from '../../config/database';

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

const betRepository = {
  createBet,
};

export default betRepository;
