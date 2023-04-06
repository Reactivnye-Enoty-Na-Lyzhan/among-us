import { useState, useImperativeHandle, useContext } from 'react';
import { SubmitButtonProps, FormSubmitRefValue } from './_typings';
import './Button.css';

export const FormSubmitButton: React.FC<SubmitButtonProps> = props => {
  console.log(`RENDER SUBMIT BUTTON\n${'-'.repeat(50)}`);
  const { componentRef, label } = props;
  const formContext = useContext(props.formContext);
  const [isDisabled, setIsDisabled] = useState(false);

  const refValue: FormSubmitRefValue = {
    updateIsDisabled({ isFormValid }: { isFormValid: boolean }) {
      const isEnabled = formContext.submitsCount.current === 0 || isFormValid;
      console.log(`SUBMIT BUTTON IS DISABLED: '${!isEnabled}'`);
      setIsDisabled(!isEnabled);
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
