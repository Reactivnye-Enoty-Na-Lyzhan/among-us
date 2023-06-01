import { BaseError } from '../BaseError';

export class NotAuthorizedError extends BaseError {
  constructor(message: string) {
    super(message);
    this.name = 'NotAuthorized';
    this.statusCode = 401;
  }
}
