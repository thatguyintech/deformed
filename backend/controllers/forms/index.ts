import { Deformed } from "@deformed/contracts";
import { Request, Response } from "express";
import { validationResult } from "express-validator";

import { Form } from "../../global/types";
import { asyncWrapper } from "../../lib/asyncWrapper";
import { ClientError } from "../../lib/error";
import { deformed } from "../../lib/protocol";
import { retrieve, store } from "../../lib/storage";
import { convertToInteger } from "../../lib/validation";

/**
 * Create a new form
 */
export const createForm = asyncWrapper(
  async (req: Request, res: Response): Promise<Response> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).send({
        errors: errors.array(),
      });
    }

    const form = req.body;
    const hash = await store(form);

    return res.status(201).send({ hash: hash });
  },
);

/**
 * Get form by formId (number)
 */
export const getForm = asyncWrapper(
  async (req: Request, res: Response): Promise<Response> => {
    const formId = convertToInteger(req.params.formId);
    // const deformed = getDeformed();
    const hash = (await deformed.forms(formId)).configIPFSHash;
    const [cid, fileName] = hash.split("/");
    const form = JSON.parse(await retrieve(cid, fileName)) as Form;
    const credentials = await deformed.getCredentials(formId);
    const accessControlTokens = await deformed.getAccessControlTokens(formId);
    return res.status(200).send({
      form: form,
      accessControlTokens: accessControlTokens.map((token) =>
        convertTokenPointer(token),
      ),
      credentials: credentials.map((token) => convertTokenPointer(token)),
    });
  },
);

/**
 * Get forms (filter by creatorAddress)
 */
export const getForms = asyncWrapper(
  async (req: Request, res: Response): Promise<Response> => {
    const createdByAddress = req.query.createdByAddress as string;
    if (!createdByAddress) {
      throw new ClientError(`createdByAddress query param is required!`);
    }
    // const deformed = getDeformed();
    const formIds = await deformed.getCreatedForms(createdByAddress);
    const data = [];
    for (const formId in formIds) {
      const hash = (await deformed.forms(formId)).configIPFSHash;
      const [cid, fileName] = hash.split("/");
      const form = JSON.parse(await retrieve(cid, fileName)) as Form;
      const credentials = await deformed.getCredentials(formId);
      const accessControlTokens = await deformed.getAccessControlTokens(formId);
      data.push({
        form: form,
        accessControlTokens: accessControlTokens.map((token) =>
          convertTokenPointer(token),
        ),
        credentials: credentials.map((token) => convertTokenPointer(token)),
      });
    }

    return res.status(200).send({ data: data });
  },
);

function convertTokenPointer(tokenPointer: Deformed.TokenPointerStructOutput) {
  return {
    contractAddress: tokenPointer.contractAddress,
    tokenId: tokenPointer.tokenId.toNumber(),
  };
}
