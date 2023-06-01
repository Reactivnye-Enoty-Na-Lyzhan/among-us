import { BaseError } from '../BaseError';

export class WrongDataError extends BaseError {
  constructor(message: string) {
    super(message);
    this.name = 'WrongData';
    this.statusCode = 400;
  }
}
