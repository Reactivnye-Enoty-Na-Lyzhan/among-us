import type { FormContext } from '@/components/Form/typings';
import type { EnumFormInputType } from './_enums';

export type FormInputRef = React.RefObject<{
  validateField: (inputValue: string) => void;
}>;

export type FormInputValidators = ((value: string) => string)[];

export type FormInputProps = React.HTMLProps<HTMLInputElement> & {
  name: string;
  context: FormContext;
  componentRef: FormInputRef;
  type?: EnumFormInputType;
  validators?: FormInputValidators;
  debugName?: string;
};

export type FormInput = React.FC<FormInputProps>;
