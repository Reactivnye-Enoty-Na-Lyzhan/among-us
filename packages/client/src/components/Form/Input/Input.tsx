import classNames from 'classnames';
import { useContext } from 'react';
import type { FormInputProps } from './_typings';
import './Input.css';
import { useInputValidation } from './_hooks';
import type { FormContextValue } from '../_typings';

export function FormInput<EnumFields extends string = string>(
  props: FormInputProps<EnumFields>
) {
  const {
    children,
    componentRef,
    formContext,
    label,
    validators,
    ...htmlProps
  } = props;

  const context = useContext(formContext) as FormContextValue<EnumFields>;
  const { validationError, setValueAndValidate } =
    useInputValidation<EnumFields>({
      componentRef,
      inputName: props.name,
      formContext: context,
      validators,
    });

  const onEventValidationHandler = async (
    e: React.FormEvent<HTMLInputElement>
  ) => {
    const inputValue = e.currentTarget.value;
    await setValueAndValidate(inputValue);
    context.updateIsFormValid?.();
  };

  console.log(`RENDER ${props.name.toUpperCase()}`);
  console.log(`STATE: ${JSON.stringify({ validationError })}`);
  console.log(`CONTEXT: ${JSON.stringify(context)}`);
  console.log('-'.repeat(50));

  return (
    <label
      className={classNames('form-input', 'form__form-input', {
        'form-input_invalid': !!validationError,
      })}>
      <span className="form-input__label">{label}</span>
      <input
        className="form-input__input"
        onChange={onEventValidationHandler}
        onBlur={onEventValidationHandler}
        {...htmlProps}
      />
      <div className="form-input__validation">{validationError}</div>
      {children}
    </label>
  );
}
