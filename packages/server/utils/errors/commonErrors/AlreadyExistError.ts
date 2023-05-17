import { BaseError } from '../BaseError';

export class AlreadyExistError extends BaseError {
  constructor(message: string) {
    super(message);
    this.name = 'AlreadyExist';
    this.statusCode = 409;
  }
};
