import { useContext } from 'react';
import { FormSubmitButton } from './SubmitButton/Button';
import type { FormProps } from './_typings';
import './Form.css';
import {
  useFormContext,
  useFormRefs,
  useFormFields,
  useFormValidation,
} from './_hooks';

function Form<EnumFields extends string>(props: FormProps<EnumFields>) {
  const { enumInputFields } = props;

  console.log(`RENDER ${props.debugName?.toUpperCase()}`);
  console.log('-'.repeat(50));

  const formReactContext = useFormContext<EnumFields>(enumInputFields);
  const formContext = useContext(formReactContext);
  const formRefs = useFormRefs<EnumFields>(enumInputFields);
  const { updateIsFormValid } = useFormValidation({
    enumInputFields,
    formContext,
    formRefs,
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
        updateIsFormValid({
          shouldForceValidateFields: formContext.isFormValid === null,
        });
      }}>
      {formFields}
      <FormSubmitButton label={'Отправить'} componentRef={formRefs.submitRef} />
    </form>
  );
}

export default Form;
