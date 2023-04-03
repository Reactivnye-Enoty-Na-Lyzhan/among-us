import { createRef, useMemo } from 'react';
import { TFormInputRef } from '../Input/typings';

export function useInputsRefs<EnumFields extends string = string>(
  enumInputFields: Record<string, EnumFields>
) {
  const refs = useMemo(
    () =>
      Object.values(enumInputFields).reduce((acc, fieldName) => {
        const inputRef = createRef() as TFormInputRef;
        acc[fieldName] = inputRef;
        return acc;
      }, {} as Record<EnumFields, TFormInputRef>),
    []
  );

  return refs;
}
