import { TFormInputProps } from '@/components/Form/Input/typings';
import { validators } from '@/utils/input-validators/validators';

export enum EnumFormFields {
  LOGIN = 'login',
  PASSWORD = 'password',
}

type TPredefinedProps = Omit<TFormInputProps, 'context' | 'name'>;

export const mapFormFieldToProps: Record<EnumFormFields, TPredefinedProps> = {
  [EnumFormFields.LOGIN]: {
    displayName: 'login',
    type: 'text',
    placeholder: 'Введите логин',
    label: 'Логин',
    validators: [
      validators.checkNoSpaces,
      validators.checkBannedSymbols,
      validators.checkLength({ min: 3, max: 20 }),
      validators.checkNotOnlyNumbers,
      validators.checkLanguage,
    ],
  },
  [EnumFormFields.PASSWORD]: {
    displayName: 'password',
    type: 'password',
    placeholder: 'Введите пароль',
    label: 'Пароль',
    validators: [
      validators.checkLength({ min: 8, max: 40 }),
      validators.checkHasCapitalLetter,
    ],
  },
};
