import { BAD_REQUEST_CODE } from '../../../../utils//constants';
import { BaseError } from '../../../../utils/errors/BaseError';

export class IncorrectDataError extends BaseError {
  constructor(message: string) {
    super(message);
    this.name = 'ToggleMessageReactionRequestIncorrectDataError';
    this.statusCode = BAD_REQUEST_CODE;
  }
}
