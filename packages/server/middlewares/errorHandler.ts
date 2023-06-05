import { Request, Response } from 'express';
import { DEFAULT_ERROR_CODE, DEFAULT_ERROR_MESSAGE } from '../utils/constants';

interface ResponseError extends Error {
  statusCode?: number;
}

export default (err: ResponseError, _req: Request, res: Response) => {
  const { statusCode = DEFAULT_ERROR_CODE, message } = err;
  console.log(
    `ERROR HANDLER MIDDLEWARE: ${JSON.stringify({ statusCode, message })}`
  );

  return res.status(statusCode).send({
    message:
      statusCode === DEFAULT_ERROR_CODE ? DEFAULT_ERROR_MESSAGE : message,
  });
};
