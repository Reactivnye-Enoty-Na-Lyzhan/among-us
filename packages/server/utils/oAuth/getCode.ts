import fetch from 'cross-fetch';
import dotenv from 'dotenv';
import { OUATH_TOKEN_URL } from '../../utils/constants';
import { WrongDataError } from '../../utils/errors/commonErrors/WrongDataError';
import { ErrorMessages } from '../../utils/errors/errorMessages';

dotenv.config({
  path: '../../../.env',
});

interface IRequestToken {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  token_type: string;
}

const { OAUTH_CLIENT, OAUTH_SECRET } = process.env;

export const getToken = async (code: string): Promise<IRequestToken> => {
  const request = await fetch(`${OUATH_TOKEN_URL}`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${Buffer.from(`${OAUTH_CLIENT}:${OAUTH_SECRET}`).toString('base64')}`,
    },
    body: `grant_type=authorization_code&code=${code}`,
  });

  if (request && request.ok) {
    return await request.json();
  }

  throw new WrongDataError(ErrorMessages.tokenError);
};
