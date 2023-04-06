import { useContext } from 'react';
import { FormSubmitButton } from './SubmitButton/Button';
import type { FormProps } from './_typings';
import './Form.css';
import { useFormContext, useFormFields, useFormValidation } from './_hooks';

function Form<EnumFields extends string>(props: FormProps<EnumFields>) {
  const { enumInputFields, onSubmitCallback } = props;

  console.log(`RENDER ${props.debugName?.toUpperCase()}`);
  console.log('-'.repeat(50));

  const formReactContext = useFormContext<EnumFields>(enumInputFields);
  const formContext = useContext(formReactContext);
  const { formRefs } = formContext;
  const { updateIsFormValid } = useFormValidation({
    enumInputFields,
    formContext,
  });
  const formFields = useFormFields<EnumFields>({
    formProps: props,
    formContext: formReactContext,
    inputsRefs: formRefs.inputsRefs,
  });

  return (
    <form
      className="form"
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
        label={'Отправить'}
        componentRef={formRefs.submitRef}
        formContext={formReactContext}
      />
    </form>
  );
}

export default Form;
