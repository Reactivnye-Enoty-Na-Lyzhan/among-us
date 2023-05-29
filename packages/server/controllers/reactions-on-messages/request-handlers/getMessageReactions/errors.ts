import { BaseError } from '../../../../utils/errors/BaseError';

export class IncorrectParametersError extends BaseError {
  constructor(message: string) {
    super(message);
    this.name = 'getMessageReactionsIncorrectParametersError';
  }
}
