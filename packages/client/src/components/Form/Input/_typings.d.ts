import type { FormContext } from '@/components/Form/typings';

export type FormInputRefValue = {
  validateField: (inputValue: string) => void;
};
export type FormInputRef = React.RefObject<FormInputRefValue>;

export type FormInputValidators = ((value: string) => string)[];
export type FormValidationHandler = (inputValue: string) => void;

export type FormInputProps<EnumFields extends string = string> =
  React.HTMLProps<HTMLInputElement> & {
    name: EnumFields;
    formContext: FormContext<EnumFields>;
    componentRef: FormInputRef;
    validators?: FormInputValidators;
    debugName?: string;
  };

export type FormInput<EnumFields extends string = string> = React.FC<
  FormInputProps<EnumFields>
>;
