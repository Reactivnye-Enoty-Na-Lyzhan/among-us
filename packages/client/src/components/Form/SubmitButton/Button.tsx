import { useState, useImperativeHandle, useContext } from 'react';
import { SubmitButtonProps, FormSubmitRefValue } from './_typings';
import './Button.css';
import classNames from 'classnames';

export const FormSubmitButton: React.FC<SubmitButtonProps> = props => {
  console.log(`RENDER SUBMIT BUTTON\n${'-'.repeat(50)}`);
  const { componentRef, buttonProps, formContext } = props;
  const { label, className, ...htmlProps } = buttonProps;

  const formContextValue = useContext(formContext);
  const [isDisabled, setIsDisabled] = useState(false);

  const refValue: FormSubmitRefValue = {
    updateIsDisabled({ isFormValid }: { isFormValid: boolean }) {
      const isEnabled =
        (formContextValue.submitsCount.current === 0 &&
          Object.values(formContextValue.formRefs.inputsRefs).every(
            inputRef => !inputRef.current?.getError()
          )) ||
        isFormValid;
      console.log(`SUBMIT BUTTON IS DISABLED: '${!isEnabled}'`);
      setIsDisabled(!isEnabled);
    },
  };
  useImperativeHandle(componentRef, () => refValue, []);

  return (
    <button
      {...htmlProps}
      type="submit"
      className={classNames('form-button', 'form__form-button', className)}
      disabled={isDisabled}>
      {label}
    </button>
  );
};
