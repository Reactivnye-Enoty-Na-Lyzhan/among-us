import { FormContext } from '../_typings';

export type FormSubmitRefValue = {
  updateIsDisabled: ({ isFormValid: boolean }) => void;
};

export type FormSubmitProps = React.HTMLProps<HTMLButtonElement> & {
  label?: string;
};

export type FormSubmitRef = React.RefObject<FormSubmitRefValue>;

export type SubmitButtonProps = {
  buttonProps: FormSubmitProps;
  componentRef: SubmitButtonRef;
  formContext: FormContext;
};
