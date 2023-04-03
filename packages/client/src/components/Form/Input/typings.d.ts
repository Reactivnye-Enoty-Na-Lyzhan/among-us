import type { TFormContext } from '@/components/Form/typings';

export type TFormInputRef = React.RefObject<{
  validateField: (inputValue: string) => void;
}>;

export type TFormInputProps = React.HTMLProps<HTMLInputElement> & {
  name: string;
  context: TFormContext;
  componentRef: TFormInputRef;
  type?: string;
  validators?: ((value: string) => string)[];
  debugName?: string;
};
