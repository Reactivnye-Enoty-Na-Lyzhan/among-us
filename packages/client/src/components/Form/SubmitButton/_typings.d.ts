type FormSubmitRef = React.RefObject<{
  setIsDisabled: (isDisabled: boolean) => void;
}>;

export type SubmitButtonProps = {
  label: string;
  componentRef: SubmitButtonRef;
};
