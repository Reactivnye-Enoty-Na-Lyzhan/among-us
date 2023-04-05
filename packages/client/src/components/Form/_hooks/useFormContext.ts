import { createContext, useMemo } from 'react';
import type { FormInputSharedData, FormContextValue } from '../_typings';

export function useFormContext<EnumFields extends string = string>(
  enumInputFields: Record<string, EnumFields>
) {
  const formContext = useMemo(() => {
    const initInputsValues = Object.values(enumInputFields).reduce(
      (acc, fieldName) => {
        acc[fieldName] = {
          value: '',
          isValid: false,
        };
        return acc;
      },
      {} as Record<EnumFields, FormInputSharedData>
    );
    const context = createContext<FormContextValue<EnumFields>>({
      inputsValues: initInputsValues,
    });

    return context;
  }, []);

  return formContext;
}
