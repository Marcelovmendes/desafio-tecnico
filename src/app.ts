import express, { Express } from "express";
import corts from "cors";

const app = express();

app.use(express.json());
app.use(corts());

app.get("/health", (req, res) => {
  res.send("OK");
});
export default app;
