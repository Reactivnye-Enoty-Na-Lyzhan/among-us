import dotenv from 'dotenv';
import type { NextFunction, Request, Response } from 'express';
import { verify, type JwtPayload } from 'jsonwebtoken';
import { User } from '../models/user';
import { NotAuthorizedError } from '../utils/errors/commonErrors/NotAuthorizedError';
import { ErrorMessages } from '../utils/errors/errorMessages';

interface IPayload extends JwtPayload {
  id: string;
}

interface ICookies {
  jwt: string;
}

interface IRequest<T> extends Request {
  user?: JwtPayload | string;
  cookies: T;
}

dotenv.config({
  path: '../../.env',
});

const { JWT_SECRET = 'secret', NODE_ENV } = process.env;

export default async (
  req: IRequest<ICookies>,
  _res: Response,
  next: NextFunction
) => {
  const { jwt } = req.cookies;

  try {
    if (!jwt) {
      throw new NotAuthorizedError(ErrorMessages.notAuthorized);
    }

    let payload: JwtPayload | string | undefined;

    try {
      payload = verify(jwt, NODE_ENV === 'production' ? JWT_SECRET : 'secret');
    } catch (err: unknown) {
      throw new NotAuthorizedError(ErrorMessages.notAuthorized);
    }

    const { id } = payload as IPayload;
    const user = await User.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotAuthorizedError(ErrorMessages.notAuthorized);
    }

    req.user = payload;

    next();
  } catch (err: unknown) {
    if (!(err instanceof NotAuthorizedError)) {
      console.log(err);
    }

    next(err);
  }
};
