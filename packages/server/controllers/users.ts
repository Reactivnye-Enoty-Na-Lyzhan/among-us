import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from '../models/user';
import { AlreadyExistError } from '../utils/errors/commonErrors/AlreadyExistError';
import { NotAuthorizedError } from '../utils/errors/commonErrors/NotAuthorizedError';
import { ErrorMessages } from '../utils/errors/errorMessages';
import { ResponseMessages } from '../utils/ResponseMessages';
import { CURRENT_HOST } from '../utils/constants';
import type { NextFunction, Request, Response } from 'express';

interface IUpdateProfileBody {
  firstName: string;
  lastName: string;
  nickname: string;
  phone: string;
  email: string;
}

interface IChangePasswordBody {
  oldPassword: string;
  newPassword: string;
}

interface IRequestUser {
  id: number;
}

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

interface IRequest<T = unknown> extends Request {
  user?: IRequestUser;
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
    } else {
      // Пробрасываем ошибку дальше
      next(user);
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};

// Выход пользователя из системы
export const logoutUser = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  // Удаляем cookie пользователя
  try {
    res
      .clearCookie('jwt', {
        domain: CURRENT_HOST,
        maxAge: 604800000,
        httpOnly: true,
        sameSite: NODE_ENV === 'production',
      })
      .send({ message: ResponseMessages.logout });
  } catch (err: unknown) {
    next(err);
  }
};

// Информация о текущем пользователе
export const getCurrentUser = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  const id = req.user?.id;

  try {
    if (!id) throw new NotAuthorizedError(ErrorMessages.notAuthorized);

    const user = await User.findOne({
      where: {
        id,
      },
    });

    if (!user) throw new NotAuthorizedError(ErrorMessages.notAuthorized);

    res.send(user);
  } catch (err: unknown) {
    next(err);
  }
};

// Обновление профиля пользователя
export const updateProfile = async (
  req: IRequest<IUpdateProfileBody>,
  res: Response,
  next: NextFunction
) => {
  const id = req.user?.id;
  const { nickname, email, firstName, lastName, phone } = req.body;

  try {
    if (!id) throw new NotAuthorizedError(ErrorMessages.notAuthorized);

    const user = await User.findOne({
      where: {
        id,
      },
    });

    if (!user) throw new NotAuthorizedError(ErrorMessages.notAuthorized);

    // Обновляем пользователя
    await user.update({
      nickname,
      email,
      firstName,
      lastName,
      phone,
    });

    res.send({
      user,
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

// Изменение пароля пользователя
export const changePassword = async (
  req: IRequest<IChangePasswordBody>,
  res: Response,
  next: NextFunction
) => {
  const id = req.user?.id;
  const { oldPassword, newPassword } = req.body;

  try {
    if (!id) throw new NotAuthorizedError(ErrorMessages.notAuthorized);

    if (oldPassword === newPassword)
      throw new AlreadyExistError(ErrorMessages.sameNewPassword);

    // Проверяем, существует ли пользователь
    const user = await User.scope('withPassword').findOne({
      where: {
        id,
      },
    });

    if (!user) throw new NotAuthorizedError(ErrorMessages.notAuthorized);

    // Если oldPassword не соответствует его нынешнему паролю
    if (!(await compare(oldPassword, user.password)))
      throw new AlreadyExistError(ErrorMessages.incorrectPassword);

    // Изменяем пароль пользователю
    const password = await hash(newPassword, 10);

    await user.update({
      password,
    });

    res.send({
      message: 'Пароль успешно изменён',
    });
  } catch (err: unknown) {
    next(err);
  }
};
