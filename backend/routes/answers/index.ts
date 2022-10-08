import { Router } from "express";
import { createAnswer } from "../../controllers/answers";

import { createAnswerValidator } from "./validation/createAnswer";

export const answersRouter = Router();

answersRouter.post("/", createAnswerValidator, createAnswer);
