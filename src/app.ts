import express, { Express } from "express";
import participantsRouter from "./routes/participants-routes";
import gamesRouter from "./routes/games-routes";
import betRouter from "./routes/bet-routes";
import { handleApplicationErrors } from "./middleware/error-handling-middleware";
import cors from "cors";
//import { connectDb } from './config/database';

const app = express();

app.use(express.json())
app.use(cors())
app.get("/health", (req, res) => res.send("OK"));
app.use(participantsRouter)
app.use(gamesRouter)
app.use(betRouter)
app.use(handleApplicationErrors);

export default app;
