import { SerializedError } from '@reduxjs/toolkit';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
declare global {
  export type RTKQueryFetchError = FetchBaseQueryError;

  export type RTKQueryError = FetchBaseQueryError | SerializedError;
}

export {};
