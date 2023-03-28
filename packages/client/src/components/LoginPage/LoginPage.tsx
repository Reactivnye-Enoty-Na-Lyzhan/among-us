import React from 'react';
import Form from '../Form/Form';
import Input from '../Form/Input/Input';
import { useForm, useValidation } from '../Form/hooks';
import { validation } from '../../utils/validation';

export default function LoginPage() {
  const { values, handleInputChange } = useForm({ login: 'test' });
  const { validationData, validateForm } = useValidation([
    { field: 'login', validation: validation.login },
    { field: 'password', validation: validation.password },
  ]);

  return (
    <div
      style={{ backgroundColor: '#010318', width: '300px', padding: '40px' }}>
      <Form
        onSubmit={() => {
          if (validateForm(values)) {
            console.log('SUBMIT', { values });
          }
        }}>
        <Input
          value={values.login}
          handleInputChange={handleInputChange}
          type={'text'}
          name={'login'}
          required={true}
          placeholder={'Введите логин'}
          label={'Логин'}
          validation={validationData.find(v => v.field === 'login')}
        />
        <Input
          value={values.password}
          handleInputChange={handleInputChange}
          type={'password'}
          name={'password'}
          required={true}
          placeholder={'Введите пароль'}
          label={'Пароль'}
          validation={validationData.find(v => v.field === 'password')}
        />
        <button type="submit">Отправить</button>
      </Form>
    </div>
  );
}
