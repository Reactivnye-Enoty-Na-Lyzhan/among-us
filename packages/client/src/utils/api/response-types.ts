import { RTKQueryError, RTKQueryFetchError } from '@/types';

export function isRTKQuerySuccessfulResponse<R>(
  response: R | { error: RTKQueryError }
): response is R {
  return Object.prototype.hasOwnProperty.call(response, 'data');
}

export function isRTKQueryFetchError(
  error: unknown
): error is RTKQueryFetchError {
  return Object.prototype.hasOwnProperty.call(error, 'data');
}
