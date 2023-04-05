export type FormSubmitRefValue = {
  updateIsDisabled: ({ isFormValid: boolean }) => void;
};

export type FormSubmitRef = React.RefObject<FormSubmitRefValue>;

export type SubmitButtonProps = {
  label: string;
  componentRef: SubmitButtonRef;
};
