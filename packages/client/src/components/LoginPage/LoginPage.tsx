import React from 'react';
import Form from '../Form/Form';
import Input from '../Form/Input/Input';
import { useForm } from '../Form/hooks';

export default function LoginPage() {
  const { values, handleInputChange } = useForm({ login: 'test' });

  return (
    <div
      style={{ backgroundColor: '#010318', width: '300px', padding: '40px' }}>
      <Form
        onSubmit={() => {
          console.log('SUBMIT', { values });
        }}>
        <Input
          value={values.login}
          handleInputChange={handleInputChange}
          type={'text'}
          name={'login'}
          required={true}
          placeholder={'Введите логин'}
          label={'Логин'}
        />
        <Input
          value={values.password}
          handleInputChange={handleInputChange}
          type={'password'}
          name={'password'}
          required={true}
          placeholder={'Введите пароль'}
          label={'Пароль'}
        />
        <button type="submit">Отправить</button>
      </Form>
    </div>
  );
}
