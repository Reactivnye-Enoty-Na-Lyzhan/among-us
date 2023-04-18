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

const isBadFormatError: ErrorClassifier = {
  predicateFunction: ({ response }) => {
    return response.error === 'Bad format';
  },
  errorMessage: ({ response }) =>
    ApiResponseMessages_RU[response.reason as ApiErrors] ??
    'Одно из полей неверно',
};

const isLoginAlreadyExistsError: ErrorClassifier = {
  predicateFunction: ({ response }) => {
    return response.reason === ApiErrors.LOGIN_ALREADY_EXISTS;
  },
  errorMessage: ApiResponseMessages_RU[ApiErrors.LOGIN_ALREADY_EXISTS],
};

const isUserAlreadyInSystem: ErrorClassifier = {
  predicateFunction: ({ response }) => {
    return response.reason === ApiErrors.USER_ALREADY_IN_SYSTEM;
  },
  errorMessage: ApiResponseMessages_RU[ApiErrors.USER_ALREADY_IN_SYSTEM],
};

export const errorClassifiers: ErrorClassifier[] = [
  isServerError,
  isBadFormatError,
  isLoginAlreadyExistsError,
  isUserAlreadyInSystem,
];
