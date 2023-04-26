import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { routes } from './routes/index';
import errorHandler from './middlewares/errorHandler';
import { ssrDevHandler } from './middlewares/ssrDevHandler';
import { ssrProductionHandler } from './middlewares/ssrProductionHandler';
import { corsSettings } from './utils/corsSettings';
import { createViteServer } from './utils/createViteServer';
import { CLIENT_PACKAGE_PATH } from './utils/constants';
import type { ViteDevServer } from 'vite';

dotenv.config();

const { NODE_ENV } = process.env;

const isDev = NODE_ENV === 'development';

const createServer = async () => {
  const app = express();

  let vite: ViteDevServer | undefined;

  if (isDev) {
    vite = await createViteServer();
    app.use(vite.middlewares);
  }

  // Middlewares
  app.use(cors(corsSettings));

  // Routes
  app.use(routes);

  // Static
  !isDev &&
    app.use(
      '/assets',
      express.static(path.join(CLIENT_PACKAGE_PATH, './dist/assets'))
    );

  // SSR Handler
  app.use('*', (req: Request, res: Response, next: NextFunction) => {
    if (isDev && vite) {
      ssrDevHandler(req, res, next, vite);
    } else {
      ssrProductionHandler(req, res, next);
    }
  });

  app.use(errorHandler);

  return { app, vite };
};

export default createServer;
