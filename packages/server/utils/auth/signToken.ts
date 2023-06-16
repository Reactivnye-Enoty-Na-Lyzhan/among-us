import { sign } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { IS_DEV } from '../../utils/constants';

interface IPayload {
  id: number;
  yandexId: number | null;
}

if (IS_DEV) {
  dotenv.config({
    path: '../../../../.env',
  });
}

const { JWT_SECRET = 'secret', NODE_ENV } = process.env;

export const singToken = (payload: IPayload, expires?: number) => {
  return sign(payload, NODE_ENV === 'production' ? JWT_SECRET : 'secret', {
    expiresIn: expires || '7d',
  });
};
