export class WrongDataError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.name = 'WrongDataError';
    this.statusCode = 400;
  }
}
