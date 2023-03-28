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

export const validation = {
  login: (value?: string) => {
    let isValid = false;
    let text = '';
    const min = 3;
    const max = 20;

    if (!value) text = 'Поле не может быть пустым';
    else if (validationMethods.checkLength(value, min, max))
      text = `Длина значения не должна быть меньше ${min} и больше ${max} символов`;
    else if (validationMethods.checkBannedSymbols(value))
      text = 'Нельзя использовать символы';
    else if (validationMethods.checkNoSpace(value))
      text = 'Нельзя использовать пробел';
    else if (validationMethods.checkLangs(value))
      text = 'Можно использовать только латинские или кириллические буквы';
    else if (validationMethods.checkOnlyNumbers(value))
      text = 'Не может состоять только из цифр';
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

    if (!value) text = 'Поле не может быть пустым';
    else if (validationMethods.checkLength(value, min, max))
      text = `Длина значения не должна быть меньше ${min} и больше ${max} символов`;
    else if (validationMethods.checkOneCapitalLetter(value))
      text = 'Должна быть хотя бы одна заглавная буква';
    else {
      isValid = true;
    }

    return { isValid, text };
  },
  name: (value?: string) => {
    let isValid = false;
    let text = '';

    if (!value) text = 'Поле не может быть пустым';
    else if (validationMethods.checkLangs(value))
      text = 'Можно использовать только латинские или кириллические буквы';
    else if (validationMethods.checkFirstCapitalLetter(value))
      text = 'Первая буква должна быть заглавной';
    else {
      isValid = true;
    }

    return { isValid, text };
  },
  email: (value?: string) => {
    let isValid = false;
    let text = '';

    if (!value) text = 'Поле не может быть пустым';
    else if (
      !value.match('^[a-zA-Z0-9@.-]') ||
      !value.match('^.+@[a-zA-Z]+.[a-zA-Z]')
    )
      text = 'Неверный формат адреса электронной почты';
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

    if (!value) text = 'Поле не может быть пустым';
    else if (validationMethods.checkLength(value, min, max))
      text = `Длина значения не должна быть меньше ${min} и больше ${max} символов`;
    else if (!value.match(/^\+?[0-9]+$/))
      text = 'Номер телефона должен состоять только из цифр';
    else {
      isValid = true;
    }

    return { isValid, text };
  },
  notEmpty: (value?: string) => {
    let isValid = false;
    let text = '';

    if (!value) text = 'Поле не может быть пустым';
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

    if (!value) text = 'Поле не может быть пустым';
    else if (value !== secondValue) text = 'Пароли должны совпадать';
    else {
      isValid = true;
    }

    return { isValid, text };
  },
};
