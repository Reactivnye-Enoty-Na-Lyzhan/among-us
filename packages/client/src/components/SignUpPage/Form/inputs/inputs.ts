import { validators } from '@/utils/input-validators/validators';
import {
  MapFormFieldToInputComponent,
  MapFormFieldToProps,
} from '@/components/Form/_typings';
import { FormInput } from '@/components/Form/Input/Input';
import { WithHideMask } from '@/components/Form/Input/_HOCS/WithHideMask/WithHideMask';

export enum EnumFormFields {
  FIRST_NAME = 'first_name',
  SECOND_NAME = 'second_name',
  EMAIL = 'email',
  PHONE = 'phone',
  LOGIN = 'login',
  PASSWORD = 'password',
}

export const mapFormFieldToProps: MapFormFieldToProps<EnumFormFields> = {
  [EnumFormFields.FIRST_NAME]: {
    type: 'text',
    placeholder: 'Введите имя',
    label: 'Имя',
    validators: {
      validatorsList: [
        validators.checkNotEmpty,
        validators.checkNoSpaces,
        validators.checkFirstLetterIsCapital,
        validators.checkLanguage,
      ],
    },
  },
  [EnumFormFields.SECOND_NAME]: {
    type: 'text',
    placeholder: 'Введите фамилию',
    label: 'Фамилия',
    validators: {
      validatorsList: [
        validators.checkNotEmpty,
        validators.checkNoSpaces,
        validators.checkFirstLetterIsCapital,
        validators.checkLanguage,
      ],
    },
  },
  [EnumFormFields.EMAIL]: {
    type: 'email',
    placeholder: 'Введите email',
    label: 'Email',
    validators: {
      validatorsList: [validators.checkNotEmpty, validators.checkBannedSymbols],
    },
  },
  [EnumFormFields.PHONE]: {
    type: 'phone',
    placeholder: 'Введите телефон',
    label: 'Телефон',
    validators: {
      validatorsList: [
        validators.checkNotEmpty,
        validators.checkNoSpaces,
        validators.checkBannedSymbols,
        validators.checkLanguage,
      ],
    },
  },
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

const FormInputWithHideMask = WithHideMask(FormInput<EnumFormFields>);
export const mapFormFieldToInputComponent: MapFormFieldToInputComponent<EnumFormFields> =
  {
    [EnumFormFields.LOGIN]: FormInput<EnumFormFields>,
    [EnumFormFields.PASSWORD]: FormInputWithHideMask,
  };
