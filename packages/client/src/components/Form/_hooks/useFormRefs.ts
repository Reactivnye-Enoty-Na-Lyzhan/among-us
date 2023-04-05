import { createRef, useMemo } from 'react';
import { FormInputRef } from '../Input/_typings';
import { FormSubmitRef } from '../SubmitButton/_typings';

type FormRefs<EnumFields extends string = string> = {
  inputsRefs: Record<EnumFields, FormInputRef>;
  submitRef: FormSubmitRef;
};

export function useFormRefs<EnumFields extends string = string>(
  enumInputFields: Record<string, EnumFields>
) {
  const formRefs = useMemo(() => {
    type Refs = FormRefs<EnumFields>;
    const refs = {} as Refs;

    (refs.inputsRefs = Object.values(enumInputFields).reduce(
      (acc, fieldName) => {
        acc[fieldName] = createRef();
        return acc;
      },
      {} as Refs['inputsRefs']
    )),
      (refs.submitRef = createRef());
    return refs;
  }, []);

  return formRefs;
}
