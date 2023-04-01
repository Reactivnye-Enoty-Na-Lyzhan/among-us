const validationMethods = {
  checkLength: (value: string, min: number, max: number) =>
    value.length < min || value.length > max,
  checkBannedSymbols: (value: string) =>
    value.match(/[.*+?^${}()|[\]\\`~!@#%&№;:,/<>]/),
  checkNoSpace: (value: string) => value.match('^.*\\s+.*$'),
  checkLangs: (value: string) => !value.match('^[a-zA-Zа-яА-Я0-9_-]'),
  checkOnlyNumbers: (value: string) => value.match('^[0-9]+$'),
  checkOneCapitalLetter: (value: string) => !value.match(/^.*[A-ZА-Я]+.*$/),
  checkFirstCapitalLetter: (value: string) => !value.match(/^[A-ZА-Я]+.*$/),
};

const validationTexts = {
  notEmpty: 'Поле не может быть пустым',
  lenNotLessNotMore:
    'Длина значения не должна быть меньше {min} и больше {max} символов',
  noSymbols: 'Нельзя использовать символы',
  noSpace: 'Нельзя использовать пробел',
  onlyCyrilicAndLatin:
    'Можно использовать только латинские или кириллические буквы',
  notOnlyNumbers: 'Не может состоять только из цифр',
  oneCapitalLetter: 'Должна быть хотя бы одна заглавная буква',
  firstCapitalLetter: 'Первая буква должна быть заглавной',
  invalidEmailFormat: 'Неверный формат адреса электронной почты',
  phone: 'Номер телефона должен состоять только из цифр',
  comparePasswords: 'Пароли должны совпадать',
};

export const validation = {
  login: (value?: string) => {
    let isValid = false;
    let text = '';
    const min = 3;
    const max = 20;

    if (!value) text = validationTexts.notEmpty;
    else if (validationMethods.checkLength(value, min, max))
      text = validationTexts.lenNotLessNotMore
        .replace('{min}', String(min))
        .replace('{max}', String(max));
    else if (validationMethods.checkBannedSymbols(value))
      text = validationTexts.noSymbols;
    else if (validationMethods.checkNoSpace(value))
      text = validationTexts.noSpace;
    else if (validationMethods.checkLangs(value))
      text = validationTexts.onlyCyrilicAndLatin;
    else if (validationMethods.checkOnlyNumbers(value))
      text = validationTexts.notOnlyNumbers;
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

    if (!value) text = validationTexts.notEmpty;
    else if (validationMethods.checkLength(value, min, max))
      text = validationTexts.lenNotLessNotMore
        .replace('{min}', String(min))
        .replace('{max}', String(max));
    else if (validationMethods.checkOneCapitalLetter(value))
      text = validationTexts.oneCapitalLetter;
    else {
      isValid = true;
    }

    return { isValid, text };
  },
  name: (value?: string) => {
    let isValid = false;
    let text = '';

    if (!value) text = validationTexts.notEmpty;
    else if (validationMethods.checkLangs(value))
      text = validationTexts.onlyCyrilicAndLatin;
    else if (validationMethods.checkFirstCapitalLetter(value))
      text = validationTexts.firstCapitalLetter;
    else {
      isValid = true;
    }

    return { isValid, text };
  },
  email: (value?: string) => {
    let isValid = false;
    let text = '';

    if (!value) text = validationTexts.notEmpty;
    else if (
      !value.match('^[a-zA-Z0-9@.-]') ||
      !value.match('^.+@[a-zA-Z]+.[a-zA-Z]')
    )
      text = validationTexts.invalidEmailFormat;
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

    if (!value) text = validationTexts.notEmpty;
    else if (validationMethods.checkLength(value, min, max))
      text = validationTexts.lenNotLessNotMore
        .replace('{min}', String(min))
        .replace('{max}', String(max));
    else if (!value.match(/^\+?[0-9]+$/)) text = validationTexts.phone;
    else {
      isValid = true;
    }

    return { isValid, text };
  },
  notEmpty: (value?: string) => {
    let isValid = false;
    let text = '';

    if (!value) text = validationTexts.notEmpty;
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

    if (!value) text = validationTexts.notEmpty;
    else if (value !== secondValue) text = validationTexts.comparePasswords;
    else {
      isValid = true;
    }

    return { isValid, text };
  },
};
