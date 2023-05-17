import { BaseError } from '../BaseError';

export class ReachLimitsError extends BaseError {
  constructor(message: string) {
    super(message);
    this.name = 'ReachLimits';
    this.statusCode = 400;
  }
};
