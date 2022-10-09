import { Router } from "express";

import {
  createForm,
  getForm,
  getFormAnswers,
  getForms,
} from "../../controllers/forms";

import { createFormValidator } from "./validation/createForm";

export const formsRouter = Router();

formsRouter.post("/", createFormValidator, createForm);
formsRouter.get("/", getForms);
formsRouter.get("/:formId", getForm);
formsRouter.get("/:formId/answers", getFormAnswers);
