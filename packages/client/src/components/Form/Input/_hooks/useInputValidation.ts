import { useCallback, useMemo, useState, useImperativeHandle } from 'react';
import type {
  FormInputProps,
  FormInputRefValue,
  InputStraightValidator,
  InputWithFormContextValidator,
} from '../_typings';
import { FormContextValue } from '../../_typings';

type Args<EnumFields extends string> = Pick<
  FormInputProps<EnumFields>,
  'componentRef' | 'debugName' | 'validators'
> & {
  inputName: EnumFields;
  formContext: FormContextValue<EnumFields>;
};

export function useInputValidation<EnumFields extends string = string>(
  args: Args<EnumFields>
) {
  const [validationError, setValidationError] = useState('');
  const { componentRef, debugName, formContext, inputName, validators } = args;

  const setValueAndValidate = useCallback(function (value?: string) {
    let inputValue: string;
    if (value === undefined) {
      inputValue = formContext.inputsValues[inputName];
    } else {
      formContext.inputsValues[inputName] = value;
      inputValue = value;
    }
    let errorMessage = '';

    validators?.every(validator => {
      if (typeof validator === 'function') {
        errorMessage = (validator as InputStraightValidator)(inputValue);
      } else {
        errorMessage = (
          validator as InputWithFormContextValidator
        ).withFormContextValidator.apply({ formContext, inputName }, [
          inputValue,
        ]);
      }

      return errorMessage === '';
    });

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
    return errorMessage;
  }, []);

  useImperativeHandle(
    componentRef,
    function (): FormInputRefValue {
      const _setValueAndValidate = setValueAndValidate;

      const _refValue = {
        setValueAndValidate(value?: string) {
          console.log(`VALIDATE ${debugName?.toUpperCase()} '${value}'`);
          return _setValueAndValidate(value);
        },
        getError() {
          return validationError;
        },
      };

      return _refValue;
    },
    [validationError]
  );

  return { validationError, setValueAndValidate };
}
