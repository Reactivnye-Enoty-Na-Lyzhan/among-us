import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import Form from '../Form/Form';
import Input from '../Form/Input/Input';
import { useForm } from '../Form/hooks';
import { validation } from '../../utils/validation';
import Button from '../Form/Button/Button';
import { useValidation } from '../../hooks/useValidation';
import './LoginPage.css';
import { signIn } from '../../controllers/auth';

const LoginPage: FC = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const { values, handleInputChange } = useForm();
  const {
    validationData,
    isFormValid,
    validateForm,
    validateField,
    clearFieldValidation,
  } = useValidation([
    { field: 'login', validation: validation.login },
    { field: 'password', validation: validation.password },
  ]);

  return (
    <div className='login-page'>
        <div className='login-page__container'>
            <h1 className='login-page__title'>Рады видеть!</h1>
            <div className='login-page__error-container'>{errorMessage}</div>        
            <Form
              onSubmit={() => { 
                if (validateForm(values)) {
                  console.log(values);
                  signIn(values, setErrorMessage);
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
                validation={validationData.login}
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
                validation={validationData.password}
              />
              <Button disabled={!isFormValid} text={'Отправить'}/>
            </Form>
            <div className='login-page__footer'>
              <span>Ещё не зарегистрированы?</span>
              <Link to={'/registration'} className='login-page__link'>Регистрация</Link>
            </div>
        </div>
    </div>
  );
};

export default LoginPage;
