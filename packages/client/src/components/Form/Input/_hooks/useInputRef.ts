import { useImperativeHandle } from 'react';
import type {
  FormInputProps,
  FormInputRefValue,
  FormValidationHandler,
} from '../_typings';

type Args = {
  componentRef: FormInputProps['componentRef'];
  debugName: FormInputProps['debugName'];
  validateInputValue: FormValidationHandler;
};

export function useInputRef({
  componentRef,
  debugName,
  validateInputValue,
}: Args) {
  const refValue: FormInputRefValue = {
    validateField(inputValue: string) {
      console.log(`VALIDATE ${debugName?.toUpperCase()} '${inputValue}'`);
      validateInputValue(inputValue);
    },
  };

  useImperativeHandle(componentRef, () => refValue, []);
}
