// Default ErrorResponse class.
export class ErrorResponse {
  constructor(
    public message: string,
    public status: number | null,
    public name: string | null
  ) {}
}
