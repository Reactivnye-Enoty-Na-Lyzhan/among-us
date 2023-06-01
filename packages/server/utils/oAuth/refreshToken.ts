import fetch from 'cross-fetch';
import dotenv from 'dotenv';
import { WrongDataError } from '../../utils/errors/commonErrors/WrongDataError';
import { ErrorMessages } from '../../utils/errors/errorMessages';
import { OUATH_TOKEN_URL } from '../../utils/constants';

dotenv.config({
  path: '../../../.env',
});

const { OAUTH_CLIENT, OAUTH_SECRET } = process.env;

export const refreshToken = async (token: string) => {
  const request = await fetch(`${OUATH_TOKEN_URL}`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(
        `${OAUTH_CLIENT}:${OAUTH_SECRET}`
      ).toString('base64')}`,
    },
    body: `grant_type=refresh_token&refresh_token=${token}`,
  });

  if (request && request.ok) {
    return await request.json();
  }

  throw new WrongDataError(ErrorMessages.tokenError);
};
