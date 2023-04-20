import { APIErrorResponse } from '@/store/auth/auth.types';

export type ClassifierArgs = {
  status: number | string;
  response: APIErrorResponse;
};
