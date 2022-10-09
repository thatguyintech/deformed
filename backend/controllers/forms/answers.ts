import { Request, Response } from "express";
import { validationResult } from "express-validator";

import { getOwnedCredentials } from "../../lib/alchemy";
import { asyncWrapper } from "../../lib/asyncWrapper";
import { deformed } from "../../lib/protocol";
import { retrieve, store } from "../../lib/storage";
import { convertToInteger } from "../../lib/validation";
interface TokenPointer {
  [contractAddress: string]: string[];
}
/**
 * Get answers for given formId, check for up-to-date credentials
 */
export const getFormAnswers = asyncWrapper(
  async (req: Request, res: Response): Promise<Response> => {
    const formId = convertToInteger(req.params.formId);

    const data = [];
    const responses = await deformed.getResponses(formId);
    const credentials = await deformed.getCredentials(formId);
    for (const response of responses) {
      const hash = response.responseIPFSHash;
      const [cid, fileName] = hash.split("/");
      const answers = JSON.parse(await retrieve(cid, fileName));

      const ownedCredentials = await getOwnedCredentials(
        response.respondingAddress,
        credentials.reduce(
          (acc: TokenPointer, { contractAddress, tokenId }) => {
            acc[contractAddress.toLowerCase()] ??= [];
            acc[contractAddress.toLowerCase()].push(
              tokenId.toNumber().toString(),
            );
            return acc;
          },
          {},
        ),
      );

      data.push({
        answers: answers,
        address: response.respondingAddress,
        ownedCredentials: ownedCredentials,
      });
    }
    return res.status(200).send({ data: data });
  },
);

/**
 * Create answer for a given formId
 */
export const createFormAnswer = asyncWrapper(
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
