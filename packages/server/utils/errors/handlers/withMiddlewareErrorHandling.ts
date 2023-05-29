import type { Request, Response } from 'express';
import type { RequestsHandler } from '../../../types/requests';
import { BaseError } from '../BaseError';

export function WithMiddlewareErrorHandling<
  Req extends Request,
  Res extends Response
>(requestHandler: RequestsHandler<Req, Res>) {
  const wrapper: RequestsHandler<Req, Res> = async (...args) => {
    const nextFunction = args[2];
    await requestHandler(...args).catch(error =>
      nextFunction(new BaseError(`${error}`))
    );
  };

  return wrapper;
}
