import React from 'react';
import Form from '../Form/Form';
// import { useForm } from '../Form/hooks';
// import { validation } from '../../utils/input-validators/validators';
// import Button from '../Form/Button/Button';
import { EnumFormFields } from './Form/inputs';
import {
  mapFormFieldToProps,
  mapFormFieldToInputComponent,
} from './Form/inputs';

const LoginPage: React.FC = () => {
  // const { values, handleInputChange } = useForm({ login: 'test' });
  // const {
  //   validationData,
  //   isFormValid,
  //   validateForm,
  //   validateField,
  //   clearFieldValidation,
  // } = useValidation([
  //   { field: 'login', validation: validation.login },
  //   { field: 'password', validation: validation.password },
  // ]);

  return (
    <div
      style={{
        backgroundColor: '#010318',
        width: '100%',
        padding: '40px',
      }}>
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
    </div>
  );
};

export default LoginPage;
