import { RedirectUrls } from '../enums';

export const getRedirectUrl = (): string => {
  switch (window.location.host) {
    case 'among-us-client.vercel.app/signin':
      return RedirectUrls.VercelApp;
    case 'enoty.ya-praktikum.tech/signin':
      return RedirectUrls.YaPraktikumTech;
    default:
      return RedirectUrls.VercelApp;
  }
};
