import { validators } from '@/utils/input-validators/validators';
import {
  MapFormFieldToInputComponent,
  MapFormFieldToProps,
} from '@/components/Form/_typings';
import { FormInput } from '@/components/Form/Input/Input';
import { WithHideMask } from '@/components/Form/Input/_HOCS/WithHideMask/WithHideMask';

export enum EnumFormFields {
  LOGIN = 'login',
  PASSWORD = 'password',
}

export const mapFormFieldToProps: MapFormFieldToProps<EnumFormFields> = {
  [EnumFormFields.LOGIN]: {
    type: 'text',
    placeholder: 'Введите логин',
    label: 'Логин',
    validators: {
      validatorsList: [
        validators.checkNotEmpty,
        validators.checkNoSpaces,
        validators.checkBannedSymbols,
        validators.checkLength({ min: 3, max: 20 }),
        validators.checkNotOnlyNumbers,
        validators.checkLanguage,
      ],
    },
  },
  [EnumFormFields.PASSWORD]: {
    type: 'password',
    placeholder: 'Введите пароль',
    label: 'Пароль',
    validators: {
      validatorsList: [
        validators.checkNotEmpty,
        validators.checkLength({ min: 8, max: 40 }),
        validators.checkHasCapitalLetter,
      ],
    },
  },
};

export const mapFormFieldToInputComponent: MapFormFieldToInputComponent<EnumFormFields> =
  {
    [EnumFormFields.LOGIN]: FormInput<EnumFormFields>,
    [EnumFormFields.PASSWORD]: WithHideMask(FormInput<EnumFormFields>),
  };
