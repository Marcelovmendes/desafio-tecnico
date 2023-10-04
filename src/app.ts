import express, { Express } from "express";
import "express-async-errors";
import participantsRouter from "./routes/participants-routes";
import gamesRouter from "./routes/games-routes";
import betRouter from "./routes/bet-routes";

import cors from "cors";
import { handleApplicationErrors } from "./middleware";

const app = express();

app
  .use(express.json())
  .use(cors())
  .get("/health", (req, res) => res.send("OK"))
  .use(participantsRouter)
  .use(gamesRouter)
  .use(betRouter)
  .use(handleApplicationErrors);

export default app;
