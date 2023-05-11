import { celebrate, Joi } from 'celebrate';
import { celebrateErrors } from './celebrateErrors';
import type { StringSchema } from 'joi';

const username = Joi.string().required().min(2).max(15);

const validateBody = (options: Record<string, StringSchema<string>>) => {
  return celebrate({
    body: Joi.object().keys(options).messages(celebrateErrors),
  });
};

/* const validateParams = (options: Record<string, StringSchema<string>>) => {
  return celebrate({
    params: Joi.object().keys(options).messages(celebrateErrors),
  });
};
 */
export const createUserValidation = validateBody({ username });
