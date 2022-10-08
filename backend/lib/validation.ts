import { InvalidInputInteger, NumberGreaterThanInteger } from "./error";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const convertToInteger = (input: any): number => {
  if (!Number.isInteger(Number(input))) {
    throw new InvalidInputInteger(input);
  }
  const number = Number(input);
  if (number > Number.MAX_SAFE_INTEGER) {
    throw new NumberGreaterThanInteger(number);
  }
  return number;
};
