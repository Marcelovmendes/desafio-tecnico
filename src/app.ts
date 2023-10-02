import express, { Express } from 'express';
import corts from 'cors';
import { handleApplicationErrors } from './middleware/error-handling-middleware';
import participantsRouter from './routes/participants-routes';

const app = express();

app.use(express.json());
app.use(corts());
app.use(handleApplicationErrors);
app.get('/health', (req, res) => res.send('OK'));
app.use(participantsRouter);

export default app;
