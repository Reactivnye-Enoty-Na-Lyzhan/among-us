import { useMemo } from 'react';
import { FormInput } from '../Input/Input';
import type { FormProps, FormContext } from '../_typings';
import type { FormInputRef } from '../Input/_typings';

type Args<EnumFields extends string> = {
  inputsRefs: Record<EnumFields, FormInputRef>;
  formContext: FormContext<EnumFields>;
} & Pick<
  FormProps<EnumFields>,
  'enumInputFields' | 'mapFormFieldToProps' | 'mapFormFieldToInputComponent'
>;

export function useFormFields<EnumFields extends string = string>({
  enumInputFields,
  mapFormFieldToProps,
  mapFormFieldToInputComponent,
  inputsRefs,
  formContext,
}: Args<EnumFields>) {
  const formFields = useMemo(
    () =>
      Object.values(enumInputFields).map((fieldName, index) => {
        const fieldProps = mapFormFieldToProps[fieldName];
        const inputRef = inputsRefs[fieldName];

        const InputComponent =
          mapFormFieldToInputComponent?.[fieldName] ?? FormInput<EnumFields>;

        console.log(
          `${fieldName.toUpperCase()} INPUT COMPONENT: ${InputComponent.name}`
        );

        return (
          <InputComponent
            componentRef={inputRef}
            key={index}
            formContext={formContext}
            name={fieldName}
            {...fieldProps}></InputComponent>
        );
      }),
    []
  );

  return formFields;
}
