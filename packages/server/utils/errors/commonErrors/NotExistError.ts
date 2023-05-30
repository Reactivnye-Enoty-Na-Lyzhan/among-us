import { BaseError } from '../BaseError';

export class NotExistError extends BaseError {
  constructor(message: string) {
    super(message);
    this.name = 'GameNotExist';
    this.statusCode = 404;
  }
}
