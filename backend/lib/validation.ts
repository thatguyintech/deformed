import { ClientError } from "./error";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const convertToInteger = (input: any): number => {
  if (!Number.isInteger(Number(input))) {
    throw new ClientError(`Input is invalid, ${input} is not a integer`);
  }
  const number = Number(input);
  if (number > Number.MAX_SAFE_INTEGER) {
    throw new ClientError(`${number} is larger than the max integer number`);
  }
  return number;
};
