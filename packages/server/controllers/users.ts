import { User } from '../models/user';
import type { NextFunction, Request, Response } from 'express';

interface IRequestBody {
  username: string,
}

interface IRequest<T> extends Request {
  body: T,
}

// Чисто для демонстрации
export const createUser = async (req: IRequest<IRequestBody>, res: Response, next: NextFunction) => {
  const { username } = req.body;
  try {
    const user = await User.create({
      username,
    });

    res.send({
      resultIs: user,
    });

  } catch (err: any) {
    if (Number(err.parent.code) === 23505) {
      res.send({ message: 'Дубликат, детка' });
      return;
    }

    next(err);
  }
};
