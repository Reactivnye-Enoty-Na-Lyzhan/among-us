import { NextFunction, Response } from 'express';

type RequestHandler = (req: any, res: Response) => Promise<void>;

export const withErrorHandler = (handler: RequestHandler) => {
  return async (req: any, res: Response, next: NextFunction) => {
    try {
      await handler(req, res);
    } catch (err) {
      next(err);
    }
  };
};
