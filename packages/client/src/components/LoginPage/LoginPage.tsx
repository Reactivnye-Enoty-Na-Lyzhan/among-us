import React from 'react';
import Form from '../Form/Form';
import Input from '../Form/Input/Input';
import { useForm } from '../Form/hooks';
import { validation } from '../../utils/validation';
import Button from '../Form/Button/Button';
import { useValidation } from '../../hooks/useValidation';

export default function LoginPage() {
  const { values, handleInputChange } = useForm({ login: 'test' });
  const { validationData, validateForm, validateField, clearFieldValidation } =
    useValidation([
      { field: 'login', validation: validation.login },
      { field: 'password', validation: validation.password },
    ]);

  return (
    <div style={{ backgroundColor: '#010318', width: '100%', padding: '40px' }}>
      <Form
        onSubmit={() => {
          if (validateForm(values)) {
            console.log('SUBMIT', { values });
          }
        }}>
        <Input
          value={values.login}
          handleInputChange={handleInputChange}
          clearFieldValidation={clearFieldValidation}
          validateField={validateField}
          type={'text'}
          name={'login'}
          placeholder={'Введите логин'}
          label={'Логин'}
          validation={validationData.find(v => v.field === 'login')}
        />
        <Input
          value={values.password}
          handleInputChange={handleInputChange}
          clearFieldValidation={clearFieldValidation}
          validateField={validateField}
          type={'password'}
          name={'password'}
          placeholder={'Введите пароль'}
          label={'Пароль'}
          validation={validationData.find(v => v.field === 'password')}
        />
        <Button
          disabled={validationData.some(d => d.isValid === false)}
          text={'Отправить'}
        />
      </Form>
    </div>
  );
}
