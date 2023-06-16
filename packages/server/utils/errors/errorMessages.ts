export enum ErrorMessages {
  emailExist = 'Указанный email уже зарегистрирован',
  loginExist = 'Указанный login уже зарегистрирован',
  phoneExist = 'Указанный номер телефона уже зарегистрирован',
  alreadyExist = 'Пользователь с указанными данными уже зарегистрирован',
  wrongPasswordOrLogin = 'Некорректные имя пользователя или пароль',
  notAuthorized = 'Ошибка авторизации',
  gameNotExist = 'Ошибка! Игра с указанным ID не существует или завершена',
  playerNotExist = 'Ошибка! Игрок с указанным ID не существует',
  playerLimits = `Невозможно присоединиться к игре, так как достигнуто максимальное количество игроков`,
  notInQueue = 'Вы не состояли в очереди на подключение',
  alreadyInQueue = 'Вы уже подключены к очереди в игру',
  alreadyConnected = 'Вы уже присоединились к игре',
  teamNotExist = 'Ошибка! Команда игрока не найдена',
  sameNewPassword = 'Ошибка! Старый и новый пароль совпадают',
  incorrectPassword = 'Вы указали некорректный текущий пароль',
  noImageProvided = 'Ошибка! Изображение не было передано при запросе, или передано некорректно!',
  tokenError = 'Ошибка при получении токена авторизации OAuth. Попробуйте ещё раз!',
  refreshTokenError = 'Ошибка при обновлении токена авторизации OAuth',
  notFound = 'Упс. Ничего не найдено',
  invalidPostId = 'Ошибка! Пост с указанным ID не существует',
  invalidMessageId = 'Ошибка! Сообщение с указанным ID не существует',
  chatNotFound = 'Ошибка! Чат не найден',
  meetingNotFound = 'Ошибка при завершении собрания! Собрание не найдено!',
}
