import express, { Express } from "express";
import "express-async-errors"
import participantsRouter from "./routes/participants-routes";
import gamesRouter from "./routes/games-routes";
import betRouter from "./routes/bet-routes";

import cors from "cors";
import { handleApplicationErrors } from "./middleware";
import { connectDb } from "./config";
//import { connectDb } from './config/database';

const app = express();

app
.use(express.json())
.use(cors())
.get("/health", (req, res) => res.send("OK"))
.use(participantsRouter)
.use(gamesRouter)
.use(betRouter)
.use(handleApplicationErrors);

export function init(): Promise<Express> {
    connectDb();
    return Promise.resolve(app);
  }
  
export default app;


