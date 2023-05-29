import type { RequestsHandler } from '../../../controllers/reactions-on-messages/types';

export function WithMiddlewareErrorHandling(requestHandler: RequestsHandler) {
  const wrapper: RequestsHandler = async (...args) => {
    const nextFunction = args[2];
    await requestHandler(...args).catch(error => nextFunction(error));
  };

  return wrapper;
}
