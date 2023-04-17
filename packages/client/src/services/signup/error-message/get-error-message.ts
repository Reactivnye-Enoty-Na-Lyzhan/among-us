import { SignUpAPIResponse } from '../_types';
import { isSuccessfulResponse, errorClassifiers } from './errors-classifiers';

type Args = {
  status: number;
  response: SignUpAPIResponse;
};

function getErrorMessage({ status, response }: Args): string {
  if (isSuccessfulResponse(status, response)) {
    return '';
  }

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
