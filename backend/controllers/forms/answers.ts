import { Request, Response } from "express";
import { validationResult } from "express-validator";

import { asyncWrapper } from "../../lib/asyncWrapper";
import { store } from "../../lib/storage";

export const createAnswer = asyncWrapper(
  async (req: Request, res: Response): Promise<Response> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).send({
        errors: errors.array(),
      });
    }

    const answer = req.body;
    const hash = await store(answer);

    return res.status(201).send({ hash: hash });
  },
);
