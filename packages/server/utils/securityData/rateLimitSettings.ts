import rateLimit from 'express-rate-limit';

export const limitAuth = rateLimit({
  windowMs: 120000,
  max: 15,
  message: {
    message:
      'Слишком много попыток авторизации с одного IP. Попробуйте позже, через 2 минуты',
  },
});

export const limitCommon = rateLimit({
  windowMs: 180000,
  max: 250,
  message: {
    message:
      'Слишком много запросов с одного IP. Попробуйте позже, через 3 минуты',
  },
});
