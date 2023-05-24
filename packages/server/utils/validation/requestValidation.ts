import { celebrate, Joi } from 'celebrate';
import { celebrateErrors } from './celebrateErrors';
import type { StringSchema, Schema } from 'joi';

const idFormat = Joi.number().required();

const username = Joi.string().required().min(2).max(15);
const firstName = Joi.string().required().min(3).max(15);
const lastName = Joi.string().required().min(3).max(15);
const phone = Joi.string().required().min(10).max(12);
const email = Joi.string().required().email();
const password = Joi.string().required();
const nickname = Joi.string().required();
const title = Joi.string().required();
const offset = Joi.number().positive().default(0);
const limit = Joi.number().positive().default(9);
const gameId = idFormat;
const taskId = idFormat;
const playerId = idFormat;
const color = Joi.string()
  .required()
  .valid(
    'white',
    'red',
    'purple',
    'aquamarine',
    'green',
    'yellow',
    'blue',
    'brown',
    'grey'
  );
const params = Joi.object<IParams>().keys({
  discussion: Joi.number().required().min(30).max(90),
  impostors: Joi.number().required().min(1).max(4),
  interval: Joi.number().required().min(10).max(60),
  meetings: Joi.number().required().min(2).max(10),
});

interface IParams {
  discussion: StringSchema<number>;
  impostors: StringSchema<number>;
  interval: StringSchema<number>;
  meetings: StringSchema<number>;
}

interface IBodyObject<T> {
  [k: string]: Schema<T>;
}

const validateBody = <T>(options: IBodyObject<T>) => {
  return celebrate({
    body: Joi.object<IBodyObject<unknown>>()
      .keys(options)
      .messages(celebrateErrors),
  });
};

export const createUserValidation = validateBody<string>({
  username,
  firstName,
  lastName,
  phone,
  email,
  password,
});

export const loginUserValidation = validateBody<string>({
  username,
  password,
});

export const createGameValidation = validateBody<string | IParams>({
  title,
  params,
});

export const findGamesValidation = validateBody<string | number>({
  title,
  offset,
  limit,
});

export const takeQueueValidation = validateBody<number>({
  gameId,
});

export const joinGameValidation = validateBody<number | string>({
  gameId,
  color,
});

export const leaveGameValidation = validateBody<number>({
  gameId,
});

export const completeTaskValidation = validateBody<number>({
  gameId,
  taskId,
  playerId,
});

export const changePasswordValidation = validateBody<string>({
  oldPassword: password,
  newPassword: Joi.string().required().invalid(Joi.in('oldPassword')),
});

export const updateProfileValidation = validateBody<string>({
  nickname,
  email,
  firstName,
  lastName,
  phone,
});
