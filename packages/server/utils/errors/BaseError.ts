import { BAD_REQUEST_CODE } from '../constants';

export class BaseError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.name = 'BaseError';
    this.statusCode = BAD_REQUEST_CODE;
  }
}
