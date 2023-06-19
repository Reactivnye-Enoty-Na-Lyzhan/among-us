import { defaultErrorClassifiers } from '../defaultErrorsClassifiers';
import { ErrorClassifier } from '../types';

const isDataAlreadyExist: ErrorClassifier = {
  predicateFunction: ({ status }) => {
    return status === 409;
  },
  errorMessage: ({ response }) => response.message,
};

export const signUpAPIErrorClassifiers = [
  isDataAlreadyExist,
  ...defaultErrorClassifiers,
];
