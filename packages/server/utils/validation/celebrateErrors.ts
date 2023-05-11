export const celebrateErrors: Record<string, string> = {
  'string.base': '{#label} не соответствуют требуемому типу данных',
  'string.empty': '{#label} не может быть пустым',
  'string.min': '{#label} должен иметь минимальную длину - {#limit}',
  'string.max': '{#label} должен иметь максимальную длину - {#limit}',
  'string.email': 'Указан некорректный формат email',
  'string.link': '{#label} указан некорректный формат ссылки',
  'string.length': 'Длина {#label} должна быть {#limit} символа',
  'string.hex': '{#label} должен быть указан в шестнадцетеричном формате',
  'string.pattern.base': '{#label} имеет некорректный формат данных. Проверьте данные и повторите запрос!',
  'object.unknown': 'поле {#label} запрещено',
  'any.required': '{#label} обязательно!',
};
