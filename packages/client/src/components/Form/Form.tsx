import React, { useMemo } from 'react';
import type { TFormInputProps } from './Input/typings';
import type {
  TFormContextValue,
  TFormInputSharedData,
  TMapFormFieldToProps,
} from './typings';
import './Form.css';

type FormProps<EnumFields extends string> = {
  displayName?: string;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  enumInputFields: Record<string, EnumFields>;
  mapFormFieldToProps: TMapFormFieldToProps<EnumFields>;
  InputComponent: React.FC<TFormInputProps>;
};

function Form<EnumFields extends string>(props: FormProps<EnumFields>) {
  const { enumInputFields, mapFormFieldToProps, InputComponent } = props;

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
    const context = React.createContext<TFormContextValue<EnumFields>>({
      inputsValues: initInputsValues,
    });

    return context;
  }, []);

  const displayName = props.displayName?.toUpperCase();
  console.log(`RENDER ${displayName}`);

  const formFields = Object.values(enumInputFields).map((fieldName, index) => {
    const fieldProps = mapFormFieldToProps[fieldName];
    return (
      <InputComponent
        key={index}
        context={formContext}
        name={fieldName}
        {...fieldProps}></InputComponent>
    );
  });

  return (
    <form
      className="form"
      noValidate
      // onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
      //   e.preventDefault();
      // }}
    >
      {formFields}
    </form>
  );
}

export default Form;
