type TFormContextValue<EnumFields extends string = string> = {
  inputsValues: Record<EnumFields, { value: string; isValid: boolean }>;
};

export type TInputFormContext<EnumFields extends string = string> =
  React.Context<TFormContextValue<EnumFields>>;
