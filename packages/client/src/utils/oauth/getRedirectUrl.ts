import { RedirectUrls } from '../enums';

export const getRedirectUrl = (): string => {
  switch (window.location.host) {
    case 'among-us-client.vercel.app':
      return RedirectUrls.VercelApp;
    case 'enoty.ya-praktikum.tech':
      return RedirectUrls.YaPraktikumTech;
    default:
      return RedirectUrls.VercelApp;
  }
};
