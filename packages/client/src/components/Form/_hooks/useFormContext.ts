import { createContext, useMemo } from 'react';
import type { FormContextValue } from '../_typings';

export function useFormContext<EnumFields extends string = string>(
  enumInputFields: Record<string, EnumFields>
) {
  const formContext = useMemo(() => {
    const contextValue = {
      inputsValues: {},
      inputsAreValid: {},
      isFormValid: null,
      updateIsFormValid: null,
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
