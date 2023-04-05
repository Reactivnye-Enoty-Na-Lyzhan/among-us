import { validators } from '@/utils/input-validators/validators';
import {
  MapFormFieldToInputComponent,
  MapFormFieldToProps,
} from '@/components/Form/typings';
import { FormInput } from '@/components/Form/Input/Input';
import { WithHideMask } from '@/components/Form/Input/_HOCS/WithHideMask/WithHideMask';

export enum EnumFormFields {
  LOGIN = 'login',
  PASSWORD = 'password',
}

export const mapFormFieldToProps: MapFormFieldToProps<EnumFormFields> = {
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

export const mapFormFieldToInputComponent: MapFormFieldToInputComponent<EnumFormFields> =
  {
    [EnumFormFields.LOGIN]: FormInput,
    [EnumFormFields.PASSWORD]: WithHideMask(FormInput),
  };
