import { BaseError } from '../../../../utils/errors/BaseError';

export class IncorrectDataError extends BaseError {
  constructor(message: string) {
    super(message);
    this.name = 'ToggleMessageReactionRequestIncorrectDataError';
  }
}
