export const enum ApiErrors {
  INVALID_EMAIL = 'email is not valid',
  INVALID_PHONE = 'phone is not valid',
  LOGIN_ALREADY_EXISTS = 'Login already exists',
  EMAIL_ALREADY_EXISTS = 'Email already exists',
  USER_ALREADY_IN_SYSTEM = 'User already in system',
}

export const ApiResponseMessages_RU = {
  [ApiErrors.INVALID_EMAIL]: 'Неправильный email',
  [ApiErrors.INVALID_PHONE]: 'Неверный номер телефона',
  [ApiErrors.LOGIN_ALREADY_EXISTS]: 'Логин занят',
  [ApiErrors.EMAIL_ALREADY_EXISTS]: 'Email занят',
  [ApiErrors.USER_ALREADY_IN_SYSTEM]: 'Вы уже авторизованы',
};
