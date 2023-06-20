import helmet from 'helmet';
import { ServerResponse } from 'http';

interface IResponse extends ServerResponse {
  locals?: {
    cspNonce: string;
  };
}

const offlineHTMLInlineStyleHash =
  'sha256-Df1vGdZfbkwT7QhOsCXy4mL+xh+jcvas3UsMdZe2R8U=';
export const helmetSettings = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: [
        "'self'",
        (_req, res: IResponse) => `'nonce-${res.locals?.cspNonce}'`,
      ],
      styleSrc: ["'self'", `'${offlineHTMLInlineStyleHash}'`],
      imgSrc: ["'self'", 'https://storage.yandexcloud.net'],
      connectSrc: ["'self'"],
    },
  },
  hsts: false,
});
