import type { NextFunction, Request, Response } from 'express';
import { NotAuthorizedError } from '../utils/errors/commonErrors/NotAuthorizedError';
import { ErrorMessages } from '../utils/errors/errorMessages';
import {UserTheme} from '../models/theme';
import { ResponseMessages } from '../utils/ResponseMessages';

interface IUser {
    id: number;
  }

interface IBodyAddTheme {
  themeId: number;
}

interface IRequest<T = unknown> extends Request {
    user?: IUser;
    body: T;
  }

export const addTheme = async (
    req: IRequest<IBodyAddTheme>,
    res: Response,
    next: NextFunction
  ) => {
    const userId = req.user?.id;
    const { themeId } = req.body;
    try {
        if (!userId) throw new NotAuthorizedError(ErrorMessages.notAuthorized);

        let theme = await UserTheme.findOne({ where: { userId } });
        if (!theme) {
          theme = await UserTheme.create({ userId, theme: themeId });
        } else {
          await theme.update({ theme: themeId });
        }

        res.send({
            message: ResponseMessages.onThemeChange,
          });

    } catch (err: unknown) {
        next(err);
      }    
  };

export const getTheme = async (
    req: IRequest<IBodyAddTheme>,
    res: Response,
    next: NextFunction
  ) => {
    const userId = req.user?.id;
    try {
        console.log(userId);
        if (!userId) throw new NotAuthorizedError(ErrorMessages.notAuthorized);

        const theme = await UserTheme.findOne({ where: { userId } });
        console.log(theme);
        //1 - id дефолтной темы, возвращаем если юзер не менял ее раньше; 
        const themeId = theme?.theme ? theme.theme : 1;
        console.log(themeId);

        res.send({themeId: themeId});

    } catch (err: unknown) {
        next(err);
      }    
  };
