import type { TInputFormContext } from '@/components/Form/typings';

export type TFormInputProps = React.HTMLProps<HTMLInputElement> & {
  name: string;
  context: TInputFormContext;
  type?: string;
  validators?: ((value: string) => string)[];
  displayName?: string;
};
