import { SIGNIN_URL } from '../../utils/constants';

  export const getRedirectUrl = (): string => {
    return `${window.location.origin}/${SIGNIN_URL}`;
  };
