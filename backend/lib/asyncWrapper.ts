import { NextFunction, Request, Response } from "express";

/**
  Necessary in Express 4 to handle exceptions gracefully and pass it on to the next middleware.

  Similar to an existing library but the types weren't matching up, so we have this file in-house.
  https://github.com/Abazhenov/express-async-handler
*/
type ExpressAsyncResponseType = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<Response>;
export const asyncWrapper = (fn: ExpressAsyncResponseType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    return fn(req, res, next).catch(next);
  };
};
