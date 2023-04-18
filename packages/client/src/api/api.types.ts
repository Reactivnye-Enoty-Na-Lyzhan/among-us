import type { SerializedError } from '@reduxjs/toolkit';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

export type RTKQueryFetchError = FetchBaseQueryError;

export type RTKQueryError = RTKQueryFetchError | SerializedError;
