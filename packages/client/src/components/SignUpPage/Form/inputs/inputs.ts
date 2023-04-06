import { validators } from '@/utils/input-validators/validators';
import {
  validateMatching,
  afterValidateMatchingCallback,
} from './password-match-validator';
import {
  MapFormFieldToInputComponent,
  MapFormFieldToProps,
} from '@/components/Form/_typings';
import { FormInput } from '@/components/Form/Input/Input';
import { WithHideMask } from '@/components/Form/Input/_HOCS/WithHideMask/WithHideMask';

export enum EnumFormFields {
  LOGIN = 'login',
  PASSWORD = 'password',
  PASSWORD_REPEAT = 'password_repeat',
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
        validateMatching<EnumFormFields>({
          thisInput: EnumFormFields.PASSWORD,
          otherInput: EnumFormFields.PASSWORD_REPEAT,
        }),
      ],
      afterValidationCallback: afterValidateMatchingCallback<EnumFormFields>({
        thisInput: EnumFormFields.PASSWORD,
        otherInput: EnumFormFields.PASSWORD_REPEAT,
      }),
    },
  },
  [EnumFormFields.PASSWORD_REPEAT]: {
    type: 'password',
    placeholder: 'Введите пароль',
    label: 'Повторите пароль',
    validators: {
      validatorsList: [
        validators.checkNotEmpty,
        validators.checkLength({ min: 8, max: 40 }),
        validators.checkHasCapitalLetter,
        validateMatching<EnumFormFields>({
          thisInput: EnumFormFields.PASSWORD_REPEAT,
          otherInput: EnumFormFields.PASSWORD,
        }),
      ],
      afterValidationCallback: afterValidateMatchingCallback<EnumFormFields>({
        thisInput: EnumFormFields.PASSWORD_REPEAT,
        otherInput: EnumFormFields.PASSWORD,
      }),
    },
  },
};

const FormInputWithHideMask = WithHideMask(FormInput<EnumFormFields>);
export const mapFormFieldToInputComponent: MapFormFieldToInputComponent<EnumFormFields> =
  {
    [EnumFormFields.LOGIN]: FormInput<EnumFormFields>,
    [EnumFormFields.PASSWORD]: FormInputWithHideMask,
    [EnumFormFields.PASSWORD_REPEAT]: FormInputWithHideMask,
  };
