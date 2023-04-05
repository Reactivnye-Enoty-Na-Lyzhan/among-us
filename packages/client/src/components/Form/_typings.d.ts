import type { FormInputProps, FormInput } from './Input/_typings';

export type FormInputSharedData = { value: string; isValid: boolean };

export type FormContextValue<EnumFields extends string = string> = {
  inputsValues: Record<EnumFields, FormInputSharedData>;
};

export type FormContext<EnumFields extends string = string> = React.Context<
  FormContextValue<EnumFields>
>;

export type MapFormFieldToProps<EnumFields extends string = string> = Record<
  EnumFields,
  Partial<FormInputProps>
>;

export type MapFormFieldToInputComponent<EnumFields extends string = string> =
  Partial<Record<EnumFields, FormInput>>;

export type FormProps<EnumFields extends string> = {
  debugName?: string;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  enumInputFields: Record<string, EnumFields>;
  mapFormFieldToProps: MapFormFieldToProps<EnumFields>;
  mapFormFieldToInputComponent?: MapFormFieldToInputComponent<EnumFields>;
};
