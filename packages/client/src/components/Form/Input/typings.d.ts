import type { TInputFormContext } from '@/components/Form/typings';

export interface Props extends React.HTMLProps<HTMLInputElement> {
  name: string;
  context: TInputFormContext;
  type?: string;
  validators?: ((value: string) => string)[];
}
