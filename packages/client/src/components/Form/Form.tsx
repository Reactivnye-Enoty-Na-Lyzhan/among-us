import React, { useState, useContext } from 'react';
import { FormSubmitButton } from './SubmitButton/Button';
import type { FormProps, FormInputSharedData } from './_typings';
import './Form.css';
import { useFormContext, useFormRefs, useFormFields } from './_hooks';

function Form<EnumFields extends string>(props: FormProps<EnumFields>) {
  const [isValid, setIsValid] = useState(true);

  const { enumInputFields } = props;

  console.log(`RENDER ${props.debugName?.toUpperCase()}`);
  console.log('-'.repeat(50));

  const formContext = useFormContext<EnumFields>(enumInputFields);
  const context = useContext(formContext);
  const { inputsRefs, submitRef } = useFormRefs<EnumFields>(enumInputFields);
  const formFields = useFormFields<EnumFields>({
    formProps: props,
    formContext,
    inputsRefs,
  });

  return (
    <form
      className="form"
      noValidate
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(`SUBMIT`);
        Object.values(enumInputFields).forEach(fieldName => {
          const inputData = context.inputsValues[fieldName];
          inputsRefs[fieldName].current?.validateField(inputData.value);
        });

        const isFormValid = Object.entries<FormInputSharedData>(
          context.inputsValues
        ).every(([inputName, inputData]) => {
          console.log(
            `${inputName} is valid: ${inputData.isValid}`.toUpperCase()
          );
          return inputData.isValid;
        });
        setIsValid(isFormValid);
      }}>
      {formFields}
      <FormSubmitButton label={'Отправить'} componentRef={submitRef} />
    </form>
  );
}

export default Form;
