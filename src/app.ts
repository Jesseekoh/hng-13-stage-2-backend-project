import express from "express";
import pino from "pino";
import pinoHttp from "pino-http";
import logger from "./libs/logger";

const app = express();
app.use(pinoHttp({ logger }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default app;
