import { ApiErrors, ApiResponseMessages_RU } from './enumAPIErrors';
import type { ErrorClassifier } from './types';

const isServerError: ErrorClassifier = {
  predicateFunction: ({ status }) => {
    return status === 500;
  },
  errorMessage: ApiResponseMessages_RU[ApiErrors.INTERNAL_SERVER_ERROR],
};

const isBadRequestError: ErrorClassifier = {
  predicateFunction: ({ status }) => {
    return status === 400;
  },
  errorMessage: ({ response }) => response.message,
};

export const defaultErrorClassifiers: ErrorClassifier[] = [
  isServerError,
  isBadRequestError,
];
