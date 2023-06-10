import helmet from 'helmet';

export const helmetSettings = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'"],
      imgSrc: ["'self'", 'https://storage.yandexcloud.net'],
      connectSrc: ["'self'"],
    },
  },
  hsts: false,
});
