import helmet from 'helmet';

export const helmetSettings = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "https://storage.yandexcloud.net"],
      connectSrc: ['*'],
    },
  },
  hsts: false,
});
