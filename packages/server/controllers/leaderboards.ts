import { NextFunction, Request, Response } from 'express';
import { LeaderBoard } from '../models/leaderboard';
import { NotAuthorizedError } from '../utils/errors/commonErrors/NotAuthorizedError';
import { ErrorMessages } from '../utils/errors/errorMessages';

interface IGetLeaderboardBody {
  offset: number;
  limit: number;
  sortField: keyof LeaderBoard;
}

interface IUser {
  id: number;
}

interface IRequest<T = unknown> extends Request {
  user?: IUser;
  body: T;
}

// Получить таблицу рейтинга пользователей
export const getLeaderboard = async (
  req: IRequest<IGetLeaderboardBody>,
  res: Response,
  next: NextFunction
) => {
  const id = req.user?.id;
  const { offset, limit, sortField } = req.body;

  try {
    if (!id) throw new NotAuthorizedError(ErrorMessages.notAuthorized);
    const leaderBoard = await LeaderBoard.scope('withUser').findAll({
      offset,
      limit,
      order: [[sortField, 'DESC']],
    });

    res.send(leaderBoard);
  } catch (err: unknown) {
    next(err);
  }
};
