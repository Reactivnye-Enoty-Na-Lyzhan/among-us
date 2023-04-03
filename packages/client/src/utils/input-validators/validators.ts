const validationErrors = {
  notEmpty: 'Поле не может быть пустым',
  wrongLength: 'Не менее {min} и  не больше {max} символов',
  hasBannedSymbols: "Недопустимые символы '{symbols}'",
  hasSpaces: 'Нельзя использовать пробел',
  nonCyrillicAndLatin: 'Только латинские или кириллические буквы',
  hasOnlyNumbers: 'Не может состоять только из цифр',
  noCapitalLetter: 'Должна быть хотя бы одна заглавная буква',
  firstLetterNotCapital: 'Первая буква должна быть заглавной',
  invalidEmailFormat: 'Неверный формат адреса электронной почты',
  phone: 'Номер телефона должен состоять только из цифр',
  comparePasswords: 'Пароли должны совпадать',
};

export const validators = {
  checkLength:
    ({ min, max }: { min: number; max: number }) =>
    (value: string) =>
      min <= value.length && value.length <= max
        ? ''
        : validationErrors.wrongLength
            .replace('{min}', String(min))
            .replace('{max}', String(max)),
  checkBannedSymbols: (value: string) => {
    const symbolsMatch = value.match(/[.*+?^${}()|[\]\\`~!@#%&№;:,/<>]/g);
    if (!symbolsMatch) {
      return '';
    }

    const uniqueBannedSymbols = [...new Set(symbolsMatch)].join('');
    return validationErrors.hasBannedSymbols.replace(
      '{symbols}',
      uniqueBannedSymbols
    );
  },
  checkNoSpaces: (value: string) =>
    !value.match('^.*\\s+.*$') ? '' : validationErrors.hasSpaces,
  checkLanguage: (value: string) =>
    value.match('^[a-zA-Zа-яА-Я0-9_-]')
      ? ''
      : validationErrors.nonCyrillicAndLatin,
  checkNotOnlyNumbers: (value: string) =>
    !value.match('^[0-9]+$') ? '' : validationErrors.hasOnlyNumbers,
  checkHasCapitalLetter: (value: string) =>
    value.match(/^.*[A-ZА-Я]+.*$/) ? '' : validationErrors.noCapitalLetter,
  checkFirstLetterIsCapital: (value: string) =>
    value.match(/^[A-ZА-Я]+.*$/) ? '' : validationErrors.firstLetterNotCapital,
};

export const validation = {
  name: (value?: string) => {
    let isValid = false;
    let text = '';

    if (!value) text = validationErrors.notEmpty;
    else if (validators.checkLanguage(value))
      text = validationErrors.nonCyrillicAndLatin;
    else if (validators.checkFirstLetterIsCapital(value))
      text = validationErrors.firstLetterNotCapital;
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
    else if (validators.checkLength({ min, max })(value))
      text = validationErrors.wrongLength
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
