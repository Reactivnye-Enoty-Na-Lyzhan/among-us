import { validationErrors } from '@/utils/input-validators/validators';
import { FormContextValue } from '@/components/Form/_typings';
import { InputWithFormContextValidator } from '@/components/Form/Input/_typings';

type ThisType<EnumFields extends string> = {
  formContext: FormContextValue<EnumFields>;
};

type InputsToCompare<EnumFields extends string> = {
  thisInput: EnumFields;
  otherInput: EnumFields;
};

export function validateMatching<EnumFields extends string = string>({
  thisInput,
  otherInput,
}: InputsToCompare<EnumFields>): InputWithFormContextValidator<EnumFields> {
  return {
    withFormContextValidator(this: ThisType<EnumFields>) {
      let errorMessage = '';
      const { inputsValues } = this.formContext;

      console.log(
        `VALUES TO COMPARE: this = ${inputsValues[thisInput]}, other = ${inputsValues[otherInput]}`
      );
      if (inputsValues[thisInput] !== inputsValues[otherInput]) {
        errorMessage = validationErrors.passwordsNotMatching;
      }

      return errorMessage;
    },
  };
}

export function afterValidateMatchingCallback<
  EnumFields extends string = string
>({ thisInput, otherInput }: InputsToCompare<EnumFields>) {
  return function (this: ThisType<EnumFields>) {
    const { inputsRefs } = this.formContext.formRefs;

    const thisInputError = inputsRefs[thisInput].current?.getError();
    const otherInputError = inputsRefs[otherInput].current?.getError();
    console.log(
      `AFTER MATCHING VALIDATION ERRORS: this = ${thisInputError}; other: ${otherInputError}`
    );

    if (
      otherInputError === validationErrors.passwordsNotMatching &&
      thisInputError === ''
    ) {
      inputsRefs[otherInput].current?.setValueAndValidate();
    }
  };
}
