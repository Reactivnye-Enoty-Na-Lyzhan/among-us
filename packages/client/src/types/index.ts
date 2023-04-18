import type {
  RTKQueryError as TypeRTKQueryError,
  RTKQueryFetchError as TypeRTKQueryFetchError,
} from '@/api/api.types';

declare global {
  export type RTKQueryFetchError = TypeRTKQueryFetchError;
  export type RTKQueryError = TypeRTKQueryError;
}

export {};
