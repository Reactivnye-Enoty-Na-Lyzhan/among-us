import { useState, useImperativeHandle } from 'react';
import { SubmitButtonProps, FormSubmitRefValue } from './_typings';
import './Button.css';

export const FormSubmitButton: React.FC<SubmitButtonProps> = ({
  label,
  componentRef,
}) => {
  console.log(`RENDER SUBMIT BUTTON\n${'-'.repeat(50)}`);

  const [isDisabled, setIsDisabled] = useState(false);

  const refValue: FormSubmitRefValue = {
    updateIsDisabled({ isFormValid }: { isFormValid: boolean }) {
      console.log(`SUBMIT BUTTON IS DISABLED: '${!isFormValid}'`);

      setIsDisabled(!isFormValid);
    },
  };
  useImperativeHandle(componentRef, () => refValue, []);

  return (
    <button
      type="submit"
      className="form-button form__form-button"
      disabled={isDisabled}>
      {label}
    </button>
  );
};
