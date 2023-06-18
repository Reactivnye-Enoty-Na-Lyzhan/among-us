import { APIErrorResponse } from '@/store/auth/auth.types';

type ClassifierArgs = {
  status: number | string;
  response: APIErrorResponse;
};

type ErrorClassifierPredicate = ({
  status,
  response,
}: ClassifierArgs) => boolean;

export type ErrorClassifier = {
  predicateFunction: ErrorClassifierPredicate;
  errorMessage: string | (({ status, response }: ClassifierArgs) => string);
};
