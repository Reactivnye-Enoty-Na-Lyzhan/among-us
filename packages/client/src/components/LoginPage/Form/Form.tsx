import Form from '@/components/Form/Form';
import {
  EnumFormFields,
  mapFormFieldToInputComponent,
  mapFormFieldToProps,
} from './inputs';

export function LoginPageForm() {
  return (
    <Form<EnumFormFields>
      debugName="LoginForm"
      enumInputFields={EnumFormFields}
      onSubmit={() => {
        // if (validateForm(values)) {
        //   console.log('SUBMIT');
        // }
      }}
      mapFormFieldToInputComponent={mapFormFieldToInputComponent}
      mapFormFieldToProps={mapFormFieldToProps}></Form>
  );
}
