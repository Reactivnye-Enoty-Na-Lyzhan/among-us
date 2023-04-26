import { createServer } from 'vite';
import { CLIENT_PACKAGE_PATH } from './constants';

export const createViteServer = async () => {
  const vite = await createServer({
    server: {
      middlewareMode: true,
    },
    root: CLIENT_PACKAGE_PATH,
    appType: 'custom',
  });

  return vite;
};
