import type { FormInputProps, FormInput, FormInputRef } from './Input/_typings';
import type { FormSubmitRef } from './SubmitButton/_typings';

export type FormValidationMod = { shouldForceValidateFields: boolean };

export type FormContextValue<EnumFields extends string = string> = {
  inputsValues: Record<EnumFields, string>;
  inputsAreValid: Record<EnumFields, boolean>;
  isFormValid: boolean | null;
  updateIsFormValid:
    | (({ shouldForceValidateFields }?: FormValidationMod) => void)
    | null;
};

export type FormContext<EnumFields extends string = string> = React.Context<
  FormContextValue<EnumFields>
>;

export type FormRefs<EnumFields extends string = string> = {
  inputsRefs: Record<EnumFields, FormInputRef>;
  submitRef: FormSubmitRef;
};

export type MapFormFieldToProps<EnumFields extends string = string> = Record<
  EnumFields,
  Partial<FormInputProps<EnumFields>>
>;

export type MapFormFieldToInputComponent<EnumFields extends string = string> =
  Partial<Record<EnumFields, FormInput<EnumFields>>>;

export type FormProps<EnumFields extends string> = {
  debugName?: string;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  enumInputFields: Record<string, EnumFields>;
  mapFormFieldToProps: MapFormFieldToProps<EnumFields>;
  mapFormFieldToInputComponent?: MapFormFieldToInputComponent<EnumFields>;
};
