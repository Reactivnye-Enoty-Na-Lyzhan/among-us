import { createContext, useMemo } from 'react';
import type { TFormInputSharedData, TFormContextValue } from '../typings';

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
      {} as Record<EnumFields, TFormInputSharedData>
    );
    const context = createContext<TFormContextValue<EnumFields>>({
      inputsValues: initInputsValues,
    });

    return context;
  }, []);

  return formContext;
}
