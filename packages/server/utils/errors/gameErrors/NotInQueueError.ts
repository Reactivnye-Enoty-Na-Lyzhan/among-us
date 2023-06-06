import { BaseError } from '../BaseError';

export class NotInQueueError extends BaseError {
  constructor(message: string) {
    super(message);
    this.name = 'NotInQueue';
    this.statusCode = 401;
  }
}
