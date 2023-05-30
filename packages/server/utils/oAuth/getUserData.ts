import { WrongDataError } from '../../utils/errors/commonErrors/WrongDataError';
import { OAUTH_GET_USER_URL } from '../../utils/constants';
import { ErrorMessages } from '../../utils/errors/errorMessages';

interface IDefaultPhone {
  id: number;
  number: string;
}

interface IOAuthUser {
  id: string;
  login: string;
  client_id: string;
  display_name: string;
  real_name: string;
  first_name: string;
  last_name: string;
  sex: null | string;
  default_email: string;
  emails: string[];
  default_avatar_id: string;
  is_avatar_empty: boolean;
  default_phone: null | IDefaultPhone;
  psuid: string;
}

export const getUserData = async (token: string): Promise<IOAuthUser> => {
  const request = await fetch(OAUTH_GET_USER_URL, {
    headers: {
      'Authorization': `OAuth ${token}`,
    },
  });

  if (request && request.ok) {
    return await request.json();
  }

  throw new WrongDataError(ErrorMessages.tokenError);
};
