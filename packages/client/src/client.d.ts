import { TypeRootState } from './store';

// eslint-disable
declare const __SERVER_PORT__: number;

declare global {
  interface Window {
    initialState?: TypeRootState;
  }
}
