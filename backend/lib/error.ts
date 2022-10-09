export class ClientError extends Error {
  statusCode?: number;
}
export class InternalServerError extends Error {}
