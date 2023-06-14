import helmet from 'helmet';
import { nonce } from './nonceSettings';

export const helmetSettings = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", `'nonce-${nonce}'`],
      styleSrc: ["'self'"],
      imgSrc: ["'self'", 'https://storage.yandexcloud.net'],
      connectSrc: ["'self'"],
    },
  },
  hsts: false,
});
