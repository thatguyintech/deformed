import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";

import { Env } from "./lib/env";
import { ClientError, InternalServerError } from "./lib/error";
import { expressLogger, apiLogger } from "./lib/logger";
import { formsRouter } from "./routes/forms";

const app: Application = express();
const port = 8080;

// Body parsing Middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cors({}));

// Setup logger
app.use(expressLogger);

// Routers
app.use("/forms", formsRouter);

// One-off: health endpoint
app.get("/healthz", async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).send({
    health: "ok",
  });
});

// One-off: generic error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.err = err;

  if (err instanceof ClientError) {
    res.status(err.statusCode || 400).send({
      error: (err as ClientError).message,
      name: (err as ClientError).name,
    });
  } else if (err instanceof InternalServerError) {
    res.status(500).send({
      error: (err as InternalServerError).message,
      name: (err as InternalServerError).name,
    });
  } else {
    res.status(500).send({
      error: "Unknown error",
    });
  }
});

////////////////////////////////////////////////////////////
// Running the app
try {
  app.listen(port, (): void => {
    apiLogger.info(
      `Connected successfully on port ${port} in ${Env.getEnvironment()}`,
    );
  });
} catch (error) {
  apiLogger.error(error, "Catastrophic error occured");
}
