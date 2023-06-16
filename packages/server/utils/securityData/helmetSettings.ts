import helmet from 'helmet';
import { ServerResponse } from 'http';

interface IResponse extends ServerResponse {
  locals?: {
    cspNonce: string;
  };
}

export const helmetSettings = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: [
        "'self'",
        (_req, res: IResponse) => `'nonce-${res.locals?.cspNonce}'`,
      ],
      styleSrc: ["'self'"],
      imgSrc: ["'self'", 'https://storage.yandexcloud.net'],
      connectSrc: ["'self'"],
    },
  },
  hsts: false,
});
