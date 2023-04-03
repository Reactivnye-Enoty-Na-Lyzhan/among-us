import React, { useState, useMemo, useContext } from 'react';
import type { TFormInputProps } from './Input/typings';
import SubmitButton from './SubmitButton/Button';
import type { TFormInputRef } from './Input/typings';
import type { TMapFormFieldToProps } from './typings';
import './Form.css';
import { useFormContext, useInputsRefs } from './_hooks';

type FormProps<EnumFields extends string> = {
  debugName?: string;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  enumInputFields: Record<string, EnumFields>;
  mapFormFieldToProps: TMapFormFieldToProps<EnumFields>;
  InputComponent: React.FC<TFormInputProps>;
};

function Form<EnumFields extends string>(props: FormProps<EnumFields>) {
  const [isValid, setIsValid] = useState(true);

  const { enumInputFields, mapFormFieldToProps, InputComponent } = props;

  const debugName = props.debugName?.toUpperCase();
  console.log(`RENDER ${debugName}`);

  const formContext = useFormContext<EnumFields>(enumInputFields);
  const context = useContext(formContext);
  const refs = useInputsRefs<EnumFields>(enumInputFields);
  const formFields = useMemo(
    () =>
      Object.values(enumInputFields).map((fieldName, index) => {
        const fieldProps = mapFormFieldToProps[fieldName];
        const inputRef = refs[fieldName];

        return (
          <InputComponent
            componentRef={inputRef}
            key={index}
            context={formContext}
            name={fieldName}
            {...fieldProps}></InputComponent>
        );
      }),
    []
  );

  return (
    <form
      className="form"
      noValidate
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(`SUBMIT`);
        Object.values(enumInputFields).forEach(fieldName => {
          const inputData = context.inputsValues[fieldName];
          refs[fieldName].current?.validateField(inputData.value);
        });
      }}>
      {formFields}
      <SubmitButton disabled={!isValid} label={'Отправить'} />
    </form>
  );
}

export default Form;
