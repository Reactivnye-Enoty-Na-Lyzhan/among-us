export const celebrateErrors: Record<string, string> = {
  'string.base': '{#label} не соответствуют требуемому типу данных',
  'string.empty': '{#label} не может быть пустым',
  'string.min': '{#label} должен иметь минимальную длину - {#limit}',
  'string.max': '{#label} должен иметь максимальную длину - {#limit}',
  'string.email': 'Указан некорректный формат email',
  'string.link': '{#label} указан некорректный формат ссылки',
  'string.length': 'Длина {#label} должна быть {#limit} символа',
  'string.hex': '{#label} должен быть указан в шестнадцетеричном формате',
  'string.pattern.base':
    '{#label} имеет некорректный формат данных. Проверьте данные и повторите запрос!',
  'number.min': 'значение {#label} должно быть больше или равно {#limit}',
  'number.max': 'значение {#label} должно быть меньше или равно {#limit}',
  'object.unknown': 'поле {#label} запрещено',
  'any.required': '{#label} обязательно!',
  'any.only':
    '{#label} должен быть {if(#valids.length == 1, "", "одним из ")}{{#valids}}',
  'any.invalid': '{{#label}} содержит неразрешённое значение. Проверьте все условия и повторите попытку снова',
};
