import { useContext, useMemo } from 'react';
import { FormSubmitButton } from './SubmitButton/Button';
import type { FormProps } from './_typings';
import './Form.css';
import { useFormContext, useFormFields, useFormValidation } from './_hooks';
import classNames from 'classnames';

function Form<EnumFields extends string>(props: FormProps<EnumFields>) {
  const {
    enumInputFields,
    mapFormFieldToProps,
    mapFormFieldToInputComponent,
    onSubmitCallback,
    submitButtonProps,
    className,
    ...htmlProps
  } = props;

  console.log(`RENDER FORM`);
  console.log('-'.repeat(50));

  const formReactContext = useFormContext<EnumFields>(enumInputFields);
  const formContext = useContext(formReactContext);
  const { formRefs } = formContext;
  const { updateIsFormValid } = useFormValidation({
    enumInputFields,
    formContext,
  });
  const formFields = useFormFields<EnumFields>({
    enumInputFields,
    mapFormFieldToProps,
    mapFormFieldToInputComponent,
    formContext: formReactContext,
    inputsRefs: formRefs.inputsRefs,
  });

  const buttonDefaultProps = useMemo(() => {
    return { label: 'Отправить' };
  }, []);

  return (
    <form
      {...htmlProps}
      className={classNames('form', className)}
      noValidate
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(`SUBMIT VALIDATION\n${'-'.repeat(50)}`);
        const { submitsCount } = formContext;
        submitsCount.current++;
        updateIsFormValid({
          shouldForceValidateFields: submitsCount.current === 1,
        });
        onSubmitCallback?.();
      }}>
      {formFields}
      <FormSubmitButton
        componentRef={formRefs.submitRef}
        formContext={formReactContext}
        buttonProps={submitButtonProps ?? buttonDefaultProps}
      />
    </form>
  );
}

export default Form;
