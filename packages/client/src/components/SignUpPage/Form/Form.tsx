import Form from '@/components/Form/Form';
import { EnumFormFields } from './inputs/inputs';
import {
  mapFormFieldToInputComponent,
  mapFormFieldToProps,
} from './inputs/inputs';

export function SignUpForm() {
  return (
    <Form<EnumFormFields>
      debugName="LoginForm"
      enumInputFields={EnumFormFields}
      onSubmitCallback={() => {
        // TODO: sign up service
      }}
      mapFormFieldToInputComponent={mapFormFieldToInputComponent}
      mapFormFieldToProps={mapFormFieldToProps}></Form>
  );
}
