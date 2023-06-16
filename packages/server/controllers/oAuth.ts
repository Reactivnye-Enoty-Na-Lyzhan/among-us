import dotenv from 'dotenv';
import { User } from '../models/user';
import { getToken } from '../utils/oAuth/getCode';
import { getUserData } from '../utils/oAuth/getUserData';
import { singToken } from '../utils/auth/signToken';
import { WrongDataError } from '../utils/errors/commonErrors/WrongDataError';
import { ErrorMessages } from '../utils/errors/errorMessages';
import {
  CURRENT_HOST,
  DEFAULT_AVATAR,
  IS_DEV,
  OAUTH_REDIRECT_URL,
} from '../utils/constants';
import type { NextFunction, Request, Response } from 'express';

interface IGetTokenBody {
  code: string;
}

interface IRequest<T = unknown> extends Request {
  body: T;
}

if (IS_DEV) {
  dotenv.config({
    path: '../../../.env',
  });
}

const { NODE_ENV } = process.env;

export const oAuthRedirect = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.redirect(301, OAUTH_REDIRECT_URL);
  } catch (err: unknown) {
    next(err);
  }
};

export const getOAuthToken = async (
  req: IRequest<IGetTokenBody>,
  res: Response,
  next: NextFunction
) => {
  const { code } = req.body;

  try {
    const { access_token, refresh_token } = await getToken(code);
    const yandexUser = await getUserData(access_token);

    // Создаём или ищем нужного пользователя

    // Можно проксировать аватар, или подгружать к себе на s3
    //const avatar = yandexUser.is_avatar_empty ? DEFAULT_AVATAR : mergeToS3(yandexUser.default_avatar_id);
    const [user] = await User.findOrCreate({
      where: {
        yandexId: yandexUser.id,
      },
      defaults: {
        login: yandexUser.login,
        firstName: yandexUser.first_name,
        lastName: yandexUser.last_name,
        nickname: yandexUser.display_name,
        phone: yandexUser.default_phone?.number || null,
        email: yandexUser.default_email,
        avatar: DEFAULT_AVATAR,
        accessToken: access_token,
        refreshToken: refresh_token,
      },
    });

    if (!user) throw new WrongDataError(ErrorMessages.tokenError);

    const token = singToken({
      id: user.id,
      yandexId: user.yandexId,
    });

    res
      .cookie('jwt', token, {
        domain: CURRENT_HOST,
        maxAge: 604800000,
        httpOnly: true,
        sameSite: NODE_ENV === 'production' ? 'strict' : false,
        secure: NODE_ENV === 'production',
      })
      .send({
        login: user.login,
      });
  } catch (err: unknown) {
    console.log(err);
    next(err);
  }
};
