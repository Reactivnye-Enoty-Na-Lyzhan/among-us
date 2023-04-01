const validationErrors = {
  notEmpty: 'Поле не может быть пустым',
  wrongLength:
    'Длина значения не должна быть меньше {min} и больше {max} символов',
  hasBannedSymbols: 'Недопустимый символ',
  noSpace: 'Нельзя использовать пробел',
  onlyCyrillicAndLatin:
    'Можно использовать только латинские или кириллические буквы',
  notOnlyNumbers: 'Не может состоять только из цифр',
  oneCapitalLetter: 'Должна быть хотя бы одна заглавная буква',
  firstCapitalLetter: 'Первая буква должна быть заглавной',
  invalidEmailFormat: 'Неверный формат адреса электронной почты',
  phone: 'Номер телефона должен состоять только из цифр',
  comparePasswords: 'Пароли должны совпадать',
};

const validationMethods = {
  checkLength: (value: string, min: number, max: number) =>
    min <= value.length && value.length <= max
      ? ''
      : validationErrors.wrongLength,
  checkBannedSymbols: (value: string) => {
    const symbolsMatch = value.match(/[.*+?^${}()|[\]\\`~!@#%&№;:,/<>]/);
    if (!symbolsMatch) {
      return '';
    }

    const uniqueBannedSymbols = [...new Set(symbolsMatch)].join('');
    return `validationErrors.hasBannedSymbols '${uniqueBannedSymbols}'`;
  },
  checkNoSpace: (value: string) => !value.match('^.*\\s+.*$'),
  checkLangs: (value: string) => value.match('^[a-zA-Zа-яА-Я0-9_-]'),
  checkOnlyNumbers: (value: string) => value.match('^[0-9]+$'),
  checkOneCapitalLetter: (value: string) => value.match(/^.*[A-ZА-Я]+.*$/),
  checkFirstCapitalLetter: (value: string) => value.match(/^[A-ZА-Я]+.*$/),
};

export const validation = {
  login: (value?: string) => {
    let isValid = false;
    let text = '';
    const min = 3;
    const max = 20;

    if (!value) text = validationErrors.notEmpty;
    else if (validationMethods.checkLength(value, min, max))
      text = validationErrors.lenNotLessNotMore
        .replace('{min}', String(min))
        .replace('{max}', String(max));
    else if (validationMethods.checkBannedSymbols(value))
      text = validationErrors.noSymbols;
    else if (validationMethods.checkNoSpace(value))
      text = validationErrors.noSpace;
    else if (validationMethods.checkLangs(value))
      text = validationErrors.onlyCyrillicAndLatin;
    else if (validationMethods.checkOnlyNumbers(value))
      text = validationErrors.notOnlyNumbers;
    else {
      isValid = true;
    }

    return { isValid, text };
  },
  password: (value?: string) => {
    let isValid = false;
    let text = '';
    const min = 8;
    const max = 40;

    if (!value) text = validationErrors.notEmpty;
    else if (validationMethods.checkLength(value, min, max))
      text = validationErrors.lenNotLessNotMore
        .replace('{min}', String(min))
        .replace('{max}', String(max));
    else if (validationMethods.checkOneCapitalLetter(value))
      text = validationErrors.oneCapitalLetter;
    else {
      isValid = true;
    }

    return { isValid, text };
  },
  name: (value?: string) => {
    let isValid = false;
    let text = '';

    if (!value) text = validationErrors.notEmpty;
    else if (validationMethods.checkLangs(value))
      text = validationErrors.onlyCyrillicAndLatin;
    else if (validationMethods.checkFirstCapitalLetter(value))
      text = validationErrors.firstCapitalLetter;
    else {
      isValid = true;
    }

    return { isValid, text };
  },
  email: (value?: string) => {
    let isValid = false;
    let text = '';

    if (!value) text = validationErrors.notEmpty;
    else if (
      !value.match('^[a-zA-Z0-9@.-]') ||
      !value.match('^.+@[a-zA-Z]+.[a-zA-Z]')
    )
      text = validationErrors.invalidEmailFormat;
    else {
      isValid = true;
    }

    return { isValid, text };
  },
  phone: (value?: string) => {
    let isValid = false;
    let text = '';
    const min = 10;
    const max = 15;

    if (!value) text = validationErrors.notEmpty;
    else if (validationMethods.checkLength(value, min, max))
      text = validationErrors.lenNotLessNotMore
        .replace('{min}', String(min))
        .replace('{max}', String(max));
    else if (!value.match(/^\+?[0-9]+$/)) text = validationErrors.phone;
    else {
      isValid = true;
    }

    return { isValid, text };
  },
  notEmpty: (value?: string) => {
    let isValid = false;
    let text = '';

    if (!value) text = validationErrors.notEmpty;
    else {
      isValid = true;
    }

    return { isValid, text };
  },
  comparePasswords: (
    value: string | undefined,
    secondValue: string | undefined
  ) => {
    let isValid = false;
    let text = '';

    if (!value) text = validationErrors.notEmpty;
    else if (value !== secondValue) text = validationErrors.comparePasswords;
    else {
      isValid = true;
    }

    return { isValid, text };
  },
};
