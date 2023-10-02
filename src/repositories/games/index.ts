import prisma from '../../config/database';

async function createGame(homeTeamName: string, awayTeamName: string) {
  const game = await prisma.game.create({
    data: {
      homeTeamName,
      awayTeamName,
      homeTeamScore: 0,
      awayTeamScore: 0,
      isFinished: false,
    },
  });
  return game;
}

async function IsTeamInGame(teamName: string) {
  const game = await prisma.game.findMany({
    where: {
      OR: [
        {
          homeTeamName: teamName,
        },
        {
          awayTeamName: teamName,
        },
      ],
    },
  });
  return game;
}
async function findGameById(id: number) {
  const game = await prisma.game.findFirst({
    where: {
      id,
    },
  });
  return game;
}
const gamesRepository = {
  createGame,
  IsTeamInGame,
  findGameById,
};

export default gamesRepository;
