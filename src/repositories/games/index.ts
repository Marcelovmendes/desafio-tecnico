import { count } from 'console';
import { prisma } from '../../config/database';

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

async function findGamesWithPagination(skip: number, perPage: number) {
  const games = await prisma.game.findMany({
    skip,
    take: perPage,
  });
  return games;
}
async function countGames() {
  const totalGames = await prisma.game.count();
  return totalGames;
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
async function updateGameScore(homeTeamScore: number, awayTeamScore: number, id: number) {
  const game = await prisma.game.update({
    where: {
      id,
    },
    data: {
      updatedAt: new Date(),
      homeTeamScore,
      awayTeamScore,
      isFinished: true,
    },
  });
  return game;
}
const gamesRepository = {
  createGame,
  IsTeamInGame,
  findGameById,
  updateGameScore,
  findGamesWithPagination,
  countGames,
};

export default gamesRepository;
