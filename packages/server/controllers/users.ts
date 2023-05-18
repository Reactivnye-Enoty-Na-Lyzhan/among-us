import { hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from '../models/user';
import { AlreadyExistError } from '../utils/errors/commonErrors/AlreadyExistError';
import { ErrorMessages } from '../utils/errors/errorMessages';
import { ResponseMessages } from '../utils/ResponseMessages';
import { CURRENT_HOST } from '../utils/constants';
import type { NextFunction, Request, Response } from 'express';

interface ICreateUserBody {
  username: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
}

interface ILoginUserBody {
  username: string;
  password: string;
}

interface IRequest<T> extends Request {
  body: T;
}

dotenv.config({
  path: '../../.env',
});

const { JWT_SECRET = 'secret', NODE_ENV } = process.env;

// Создание пользователя
export const createUser = async (
  req: IRequest<ICreateUserBody>,
  res: Response,
  next: NextFunction
) => {
  const { username, firstName, lastName, phone, email, password } = req.body;

  try {
    const passwordHash = await hash(password, 10);
    const user = await User.create({
      username,
      firstName,
      lastName,
      phone,
      email,
      password: passwordHash,
    });

    res.send({
      username: user.username,
      firstName,
      lastName,
      phone,
      email: user.email,
      id: user.id,
    });
  } catch (err: any) {
    if (Number(err.parent.code) === 23505) {
      const existed: string = err.errors[0]?.path;
      let message: string;

      switch (existed) {
        case 'email':
          message = ErrorMessages.emailExist;
          break;
        case 'username':
          message = ErrorMessages.usernameExist;
          break;
        case 'phone':
          message = ErrorMessages.phoneExist;
          break;
        default:
          message = ErrorMessages.alreadyExist;
          break;
      }

      return next(new AlreadyExistError(message));
    }

    next(err);
  }
};

// Авторизация пользователя
export const loginUser = async (
  req: IRequest<ILoginUserBody>,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body;
  try {
    // Проверяем, существует ли пользователь
    const user = await User.findByCredentials(username, password);
    // Если существует - выставляем cookie
    if (user && user instanceof User) {
      const token = sign(
        {
          id: user.id,
        },
        NODE_ENV === 'production' ? JWT_SECRET : 'secret',
        { expiresIn: '7d' }
      );
      res
        .cookie('jwt', token, {
          domain: CURRENT_HOST,
          maxAge: 604800000,
          httpOnly: true,
          sameSite: NODE_ENV === 'production',
        })
        .send({
          username: user.username,
        });
    }
  } catch (err) {
    next(err);
  }
};

// Выход пользователя из системы
export const logoutUser = async (_req: Request, res: Response) => {
  // Удаляем cookie пользователя
  res
    .clearCookie('jwt', {
      domain: CURRENT_HOST,
      maxAge: 604800000,
      httpOnly: true,
      sameSite: NODE_ENV === 'production',
    })
    .send({ message: ResponseMessages.logout });
};
