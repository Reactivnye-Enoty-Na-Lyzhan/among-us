import type { APIErrorResponse } from '@/store/auth/auth.types';
import { DefaultLogger } from '@/utils/logging/defaultLogger';
import { Logger } from '@/utils/logging/types';
import { defaultErrorClassifiers } from './defaultErrorsClassifiers';
import { ErrorClassifier } from './types';

type FactoryArgs = {
  apiName: string;
  errorClassifiers?: ErrorClassifier[];
  logger?: Logger;
};

type FunctionArgs = {
  status: number | string;
  response: APIErrorResponse;
};

export function createErrorMessageGetter({
  errorClassifiers = defaultErrorClassifiers,
  apiName,
  logger: inputLogger,
}: FactoryArgs) {
  const logger = inputLogger ?? new DefaultLogger({ defaultLogType: 'log' });

  function getErrorMessage({ status, response }: FunctionArgs): string {
    let error: string | undefined;

    errorClassifiers.some(({ predicateFunction, errorMessage }) => {
      const isMatching = predicateFunction({ status, response });
      if (isMatching) {
        if (typeof errorMessage === 'string') {
          error = errorMessage;
        } else {
          error = errorMessage({ status, response });
        }
      }

      return isMatching;
    });

    return error ?? `Непредвиденная ошибка: ${status}`;
  }

  const memoizedGetErrorMessage = (() => {
    const cache: Record<string, string> = {};

    return function memoized({ status, response }: FunctionArgs) {
      let logInfo =
        `${apiName} api error - status: ${status}, response: ${JSON.stringify(
          response
        )}`.toUpperCase();
      logger.log({ logInfo });

      const cacheKey = JSON.stringify([status, response]);
      const cachedResult = cache[cacheKey];
      if (cachedResult) {
        logInfo =
          `${apiName} api error message: ${cachedResult} (from memo)`.toUpperCase();
        logger.log({ logInfo });

        return cachedResult;
      }

      const newResult = getErrorMessage({ status, response });
      cache[cacheKey] = newResult;

      logInfo =
        `${apiName} api error message: ${newResult} (to memo)`.toUpperCase();
      console.log({ logInfo });

      return newResult;
    };
  })();

  return memoizedGetErrorMessage;
}
