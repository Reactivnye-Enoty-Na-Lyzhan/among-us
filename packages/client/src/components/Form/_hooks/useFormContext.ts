import { createContext, useMemo, useRef } from 'react';
import type { FormContextValue } from '../_typings';
import { useFormRefs } from './useFormRefs';

export function useFormContext<EnumFields extends string = string>(
  enumInputFields: Record<string, EnumFields>
) {
  const formRefs = useFormRefs<EnumFields>(enumInputFields);
  const submitsCount = useRef(0);

  const formContext = useMemo(() => {
    const contextValue = {
      inputsValues: {},
      inputsAreValid: {},
      isFormValid: null,
      updateIsFormValid: null,
      formRefs,
      submitsCount,
    } as FormContextValue<EnumFields>;
    Object.values(enumInputFields).forEach(fieldName => {
      contextValue.inputsValues[fieldName] = '';
      contextValue.inputsAreValid[fieldName] = false;
    });

    const context = createContext(contextValue);
    return context;
  }, []);

  return formContext;
}
