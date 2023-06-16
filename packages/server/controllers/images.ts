import { uploadSingleImage } from '../utils/s3/uploadSingleImage';
import { User } from '../models/user';
import { NotAuthorizedError } from '../utils/errors/commonErrors/NotAuthorizedError';
import { WrongDataError } from '../utils/errors/commonErrors/WrongDataError';
import { ErrorMessages } from '../utils/errors/errorMessages';
import type { NextFunction, Request, Response } from 'express';
import { deleteExistingImage } from '../utils/s3/deleteExistingImage';

interface IUser {
  id: number;
}

interface IRequest<T = unknown> extends Request {
  user?: IUser;
  body: T;
}

// Загрузка изображения
export const uploadImage = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  const id = req.user?.id;

  try {
    const { file } = req;

    if (!file) throw new WrongDataError(ErrorMessages.noImageProvided);

    if (!id) throw new NotAuthorizedError(ErrorMessages.notAuthorized);

    // Получаем текущего пользователя
    const user = await User.findOne({
      where: {
        id,
      },
    });

    if (!user) throw new NotAuthorizedError(ErrorMessages.notAuthorized);

    // Загружаем изображение в хранилище
    const result = await uploadSingleImage(file);

    if (result instanceof Error) throw result;

    // Получаем предыдущий аватар
    const currentAvatar = user.avatar;

    // Обновляем автар на новый
    await user.update({
      avatar: result,
    });

    // Если у пользователя уже была загружена аватарка - удаляем её из хранилища
    if (currentAvatar) {
      await deleteExistingImage(currentAvatar);
    }

    res.send({
      result,
    });
  } catch (err: unknown) {
    console.log(err);
    next(err);
  }
};
