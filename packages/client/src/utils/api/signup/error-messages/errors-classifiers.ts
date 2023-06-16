import { ClassifierArgs } from './_types';
import { ApiErrors, ApiResponseMessages_RU } from './enum-api-errors';

type ErrorClassifierPredicate = ({
  status,
  response,
}: ClassifierArgs) => boolean;

type ErrorClassifier = {
  predicateFunction: ErrorClassifierPredicate;
  errorMessage: string | (({ status, response }: ClassifierArgs) => string);
};

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

export const errorClassifiers: ErrorClassifier[] = [
  isServerError,
  isBadRequestError,
];
