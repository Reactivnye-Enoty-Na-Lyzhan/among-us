import type { FormContext, FormContextValue } from '@/components/Form/typings';

export type FormInputRefValue = {
  setValueAndValidate: (value?: string) => void;
  getError: () => string;
};
export type FormInputRef = React.RefObject<FormInputRefValue>;

type InputStraightValidator = (value: string) => string;
type InputWithFormContextValidator<EnumFields extends string = string> = {
  withFormContextValidator: (
    this: { formContext: FormContextValue<EnumFields>; inputName: EnumFields },
    value: string
  ) => string;
};
export type FormInputValidators<EnumFields extends string = string> = (
  | InputStraightValidator
  | InputWithFormContextValidator<EnumFields>
)[];

export type FormInputProps<EnumFields extends string = string> =
  React.HTMLProps<HTMLInputElement> & {
    name: EnumFields;
    formContext: FormContext<EnumFields>;
    componentRef: FormInputRef;
    validators?: FormInputValidators<EnumFields>;
    debugName?: string;
  };

export type FormInput<EnumFields extends string = string> = React.FC<
  FormInputProps<EnumFields>
>;
