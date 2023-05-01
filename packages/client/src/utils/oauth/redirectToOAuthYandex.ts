import { getRedirectUrl } from './getRedirectUrl';

export const redirectToOAuthYandex = (serviceId: string) => {
  const url = new URL('https://oauth.yandex.ru/authorize');
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: serviceId,
    redirect_uri: getRedirectUrl(),
  });

  window.location.href = `${url}?${params}`;
};
