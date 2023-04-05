import { useCallback, useState } from 'react';
import { FormContextValue } from '@/components/Form/_typings';
import { FormInputProps, FormValidationHandler } from '../_typings';

type Args = {
  formContext: FormContextValue;
  inputName: FormInputProps['name'];
  validators: FormInputProps['validators'];
};

export function useInputValidation(args: Args) {
  const { inputName, formContext, validators } = args;

  const [validationError, setValidationError] = useState('');
  const validateInputValue: FormValidationHandler = useCallback(function (
    inputValue: string
  ) {
    let errorMessage = '';

    validators?.some(validator => {
      errorMessage = validator(inputValue);
      return errorMessage !== '';
    });

    formContext.inputsValues[inputName] = inputValue;
    const isInputValid = {
      current: errorMessage === '',
      previous: formContext.inputsAreValid[inputName],
    };
    if (isInputValid.current !== isInputValid.previous) {
      formContext.inputsAreValid = {
        ...formContext.inputsAreValid,
        [inputName]: isInputValid.current,
      };
    }
    setValidationError(errorMessage);
  },
  []);

  return { validationError, validateInputValue };
}
