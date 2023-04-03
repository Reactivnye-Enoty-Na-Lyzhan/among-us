import { TFormInputProps } from '@/components/Form/Input/typings';
import { validators } from '@/utils/input-validators/validators';

export enum EnumFormFields {
  LOGIN = 'login',
  PASSWORD = 'password',
}

type TPredefinedProps = Omit<
  TFormInputProps,
  'name' | 'context' | 'componentRef'
>;

export const mapFormFieldToProps: Record<EnumFormFields, TPredefinedProps> = {
  [EnumFormFields.LOGIN]: {
    debugName: 'login',
    type: 'text',
    placeholder: 'Введите логин',
    label: 'Логин',
    validators: [
      validators.checkNotEmpty,
      validators.checkNoSpaces,
      validators.checkBannedSymbols,
      validators.checkLength({ min: 3, max: 20 }),
      validators.checkNotOnlyNumbers,
      validators.checkLanguage,
    ],
  },
  [EnumFormFields.PASSWORD]: {
    debugName: 'password',
    type: 'password',
    placeholder: 'Введите пароль',
    label: 'Пароль',
    validators: [
      validators.checkNotEmpty,
      validators.checkLength({ min: 8, max: 40 }),
      validators.checkHasCapitalLetter,
    ],
  },
};
