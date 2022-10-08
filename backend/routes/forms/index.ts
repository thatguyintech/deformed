import { Router } from "express";

import { createForm } from "../../controllers/forms";
import { createFormValidator } from "./validation/createForm";


export const formsRouter = Router();

formsRouter.post("/", createFormValidator, createForm);
