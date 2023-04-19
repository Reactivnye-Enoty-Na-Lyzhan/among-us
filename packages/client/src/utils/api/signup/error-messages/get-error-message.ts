import { APIErrorResponse } from '@/store/auth/auth.types';
import { errorClassifiers } from './errors-classifiers';

type Args = {
  status: number | string;
  response: APIErrorResponse;
};

function getErrorMessage({ status, response }: Args): string {
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

  return (
    error ?? `Непредвиденная ошибка: ${status}; ${JSON.stringify(response)}`
  );
}

const memoizedGetErrorMessage = (() => {
  const cache: Record<string, string> = {};

  return function memoized({ status, response }: Args) {
    const cacheKey = JSON.stringify([status, response]);
    const cachedResult = cache[cacheKey];
    if (cachedResult) {
      console.log(`SIGNUP API ERROR MESSAGE: ${cachedResult} (FROM MEMO)`);
      return cachedResult;
    }

    const newResult = getErrorMessage({ status, response });
    cache[cacheKey] = newResult;

    console.log(`SIGNUP API ERROR MESSAGE: ${newResult} (TO MEMO)`);
    return newResult;
  };
})();

export { memoizedGetErrorMessage as getErrorMessage };
