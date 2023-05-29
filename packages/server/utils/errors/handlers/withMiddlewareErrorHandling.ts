import type { RequestsHandler } from '../../../types/requests';
import { BaseError } from '../BaseError';

export function WithMiddlewareErrorHandling(requestHandler: RequestsHandler) {
  const wrapper: RequestsHandler = async (...args) => {
    const nextFunction = args[2];
    await requestHandler(...args).catch(error =>
      nextFunction(new BaseError(`${error}`))
    );
  };

  return wrapper;
}
