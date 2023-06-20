import { RTKQueryError, RTKQueryFetchError } from '@/types/rtk-query';
import { isObject } from '../objects-handle/isObject';

type SuccessfulResponse = { data: unknown };
type ErrorResponse = { error: RTKQueryError };
export function isRTKQuerySuccessfulResponse<R extends SuccessfulResponse>(
  response: R | ErrorResponse
): response is R {
  return Object.hasOwn(response, 'data');
}

export function isRTKQueryFetchError(
  error: unknown
): error is RTKQueryFetchError {
  return (
    isObject(error) &&
    (Object.hasOwn(error, 'data') || Object.hasOwn(error, 'error'))
  );
}
