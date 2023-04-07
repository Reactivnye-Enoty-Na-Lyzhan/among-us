import Form from '@/components/Form/Form';
import { EnumFormFields } from './inputs/inputs';
import {
  mapFormFieldToInputComponent,
  mapFormFieldToProps,
} from './inputs/inputs';

export function SignUpForm() {
  return (
    <Form<EnumFormFields>
      className="signup-page__form"
      enumInputFields={EnumFormFields}
      onSubmitCallback={() => {
        // TODO: sign up service
      }}
      submitButtonProps={{
        label: 'Зарегистрироваться',
      }}
      mapFormFieldToInputComponent={mapFormFieldToInputComponent}
      mapFormFieldToProps={mapFormFieldToProps}></Form>
  );
}
