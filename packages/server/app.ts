import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import { createServer as createHttpServer } from 'http';
import path from 'path';
import celebrateErrorHandler from './middlewares/celebrateErrorHandler';
import errorHandler from './middlewares/errorHandler';
import { ssrDevHandler } from './middlewares/ssrDevHandler';
import { ssrProductionHandler } from './middlewares/ssrProductionHandler';
import { routes } from './routes/index';
import { connectIO } from './socket';
import { connectDataBase } from './utils/connectDataBase';
import { CLIENT_PACKAGE_PATH } from './utils/constants';
import { helmetSettings } from './utils/securityData/helmetSettings';
import { nonce } from './utils/securityData/nonceSettings';

const { NODE_ENV } = process.env;

const isDev = NODE_ENV === 'development';

const createServer = async () => {
  const app = express();

  // Http-server for express and sockets
  const server = createHttpServer(app);

  //Nonce-Token
  app.use((_req, res, next) => {
    res.locals.cspNonce = nonce();
    next();
  });

  // CSP
  if (!isDev) {
    app.use(helmetSettings);
  }

  // DataBase
  await connectDataBase();

  // Sockets
  connectIO(server);

  // Vite Dev-server
  let vite: import('vite').ViteDevServer | undefined;

  if (isDev) {
    const { createViteServer } = await import('./utils/createViteServer');
    vite = await createViteServer();
    app.use(vite.middlewares);
  }

  // Parsers
  app.use(bodyParser.json());
  app.use(cookieParser());

  // Middlewares
  app.use(cors());

  // Static
  !isDev &&
    app.use(
      '/assets',
      express.static(path.join(CLIENT_PACKAGE_PATH, './dist/assets'))
    );

  // Service Worker
  const swPath = path.resolve(CLIENT_PACKAGE_PATH, 'dist/service-worker.js');
  app.get('/service-worker.js', (_, res: Response) => {
    res.sendFile(swPath);
  });

  // Offline HTML
  const offlineHTMLPath = path.resolve(
    CLIENT_PACKAGE_PATH,
    'dist/offline.html'
  );
  app.get('/offline.html', (_, res: Response) => {
    res.sendFile(offlineHTMLPath);
  });

  // SSR Handler
  app.use('*', (req: Request, res: Response, next: NextFunction) => {
    if (req.originalUrl.startsWith('/api')) return next();

    if (isDev && vite) {
      ssrDevHandler(req, res, next, vite);
    } else {
      ssrProductionHandler(req, res, next);
    }
  });

  // Routes
  app.use(routes);

  // Celebrate Error
  app.use(celebrateErrorHandler);

  // Common Errors
  app.use(errorHandler);

  return { server };
};

export default createServer;
