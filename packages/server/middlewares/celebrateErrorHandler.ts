import { Request, Response, NextFunction } from 'express';
import { isCelebrateError } from 'celebrate';
import { WrongDataError } from '../utils/errors/commonErrors/WrongDataError';

interface ResponseError extends Error {
  statusCode?: number;
}

export default (
  err: ResponseError,
  _req: Request,
  _res: Response,
  next: NextFunction
) => {
  if (isCelebrateError(err)) {
    const params = err.details.get('params');

    if (params) {
      return next(new WrongDataError(params.message));
    }

    const message = err.details.get('body')?.message || 'Ошибка валидации';
    return next(new WrongDataError(message));
  }

  return next(err);
};
