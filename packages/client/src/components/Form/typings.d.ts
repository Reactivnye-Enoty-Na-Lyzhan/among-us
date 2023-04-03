import { TFormInputProps } from './Input/typings';

export type TFormInputSharedData = { value: string; isValid: boolean };

export type TFormContextValue<EnumFields extends string = string> = {
  inputsValues: Record<EnumFields, TFormInputSharedData>;
};

export type TInputFormContext<EnumFields extends string = string> =
  React.Context<TFormContextValue<EnumFields>>;

export type TMapFormFieldToProps<EnumFields extends string = string> = Record<
  EnumFields,
  Partial<TFormInputProps>
>;
