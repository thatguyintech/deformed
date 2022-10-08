export class ClientError extends Error {
  statusCode?: number;
}
export class InternalServerError extends Error {}

export class NumberGreaterThanInteger extends ClientError {
  constructor(number: number) {
    super(`${number} is larger than the max integer number`);
    this.name = "NumberGreaterThanInteger";
  }
}

export class InvalidInputInteger extends ClientError {
  constructor(input: any) {
    super(`Input is invalid, ${input} is not a integer`);
    this.name = "InvalidInputInteger";
  }
}
