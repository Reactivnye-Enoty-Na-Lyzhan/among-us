import { validationErrors } from '@/utils/input-validators/validators';
import { FormContextValue } from '@/components/Form/_typings';

type ThisType<EnumFields extends string> = {
  formContext: FormContextValue<EnumFields>;
  inputName: EnumFields;
};

type InputsToCompare<EnumFields extends string> = {
  thisInput: EnumFields;
  otherInput: EnumFields;
};

export function validateMatching<EnumFields extends string = string>({
  thisInput,
  otherInput,
}: InputsToCompare<EnumFields>) {
  return function (this: ThisType<EnumFields>) {
    const { inputsRefs } = this.formContext.formRefs;
    let errorMessage = '';
    const { inputsValues } = this.formContext;

    console.log(
      `VALUES TO COMPARE: this = ${inputsValues[thisInput]}, other = ${inputsValues[otherInput]}`
    );
    if (inputsValues[thisInput] !== inputsValues[otherInput]) {
      errorMessage = validationErrors.passwordsNotMatching;
    }
    console.log(
      `OTHER INPUT ERROR: '${inputsRefs[otherInput].current?.getError()}'`
    );
    if (
      inputsRefs[otherInput].current?.getError() ===
        validationErrors.passwordsNotMatching &&
      errorMessage === ''
    ) {
      inputsRefs[otherInput].current?.setValueAndValidate();
    }

    return errorMessage;
  };
}
