import { Router } from "express";

import {
  createForm,
  getForm,
  getFormAnswers,
  getForms,
} from "../../controllers/forms";
import { createAnswer } from "../../controllers/forms/answers";

import { createAnswerValidator } from "./validation/createAnswer";
import { createFormValidator } from "./validation/createForm";

export const formsRouter = Router();

// Forms
formsRouter.post("/", createFormValidator, createForm);
formsRouter.get("/", getForms);
formsRouter.get("/:formId", getForm);

// Form Answers
formsRouter.post("/:formId/answers", createAnswerValidator, createAnswer);
formsRouter.get("/:formId/answers", getFormAnswers);
