import Button from '@/components/Form/Button/Button';
import Form from '@/components/Form/Form';
import Input from '@/components/Form/Input/Input';
import { useForm } from '@/components/Form/hooks';
import { useValidation } from '@/hooks/useValidation';
import { validation } from '@/utils/validation';
import { useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOnSubmitQueries } from './hooks/useOnSubmitRequests';
import { SignUpFormData } from './_types';
import classNames from 'classnames';

export default function SignUpForm() {
  const { values, handleInputChange } = useForm({
    name: '',
    secondName: '',
    email: '',
    phone: '',
    login: '',
    password: '',
  });
  const {
    validationData,
    isFormValid,
    validateForm,
    validateField,
    clearFieldValidation,
  } = useValidation([
    { field: 'name', validation: validation.name },
    { field: 'secondName', validation: validation.name },
    { field: 'email', validation: validation.email },
    { field: 'phone', validation: validation.phone },
    { field: 'login', validation: validation.login },
    { field: 'password', validation: validation.password },
  ]);

  const navigate = useNavigate();

  const valuesRef = useRef(values);
  valuesRef.current = values;

  const {
    apiQueryStatusMessage,
    sendSignUpQuery,
    getUserQueryStatus,
    sendGetUserQuery,
    signUpQueryStatus,
  } = useOnSubmitQueries();

  const onSubmitHandler = useCallback(async () => {
    const formData = valuesRef.current;
    if (!validateForm(formData)) {
      return;
    }

    sendSignUpQuery(formData as SignUpFormData);
    sendGetUserQuery();
  }, []);

  if (signUpQueryStatus.isSuccess) {
    if (getUserQueryStatus.isSuccess) {
      setTimeout(() => navigate('/game'), 3000);
    } else {
      setTimeout(() => navigate('/login'), 3000);
    }
  }

  return (
    <>
      <div
        className={classNames('signup-page-main__api-status-message', {
          'signup-page-main__api-status-message_success':
            signUpQueryStatus.isSuccess,
        })}>
        {apiQueryStatusMessage}
      </div>
      <Form onSubmit={onSubmitHandler}>
        <Input
          value={values.name}
          handleInputChange={handleInputChange}
          clearFieldValidation={clearFieldValidation}
          validateField={validateField}
          type={'text'}
          name={'name'}
          placeholder={'Введите имя'}
          label={'Имя'}
          validation={validationData.name}
        />
        <Input
          value={values.secondName}
          handleInputChange={handleInputChange}
          clearFieldValidation={clearFieldValidation}
          validateField={validateField}
          type={'text'}
          name={'secondName'}
          placeholder={'Введите фамилию'}
          label={'Фамилия'}
          validation={validationData.secondName}
        />
        <Input
          value={values.email}
          handleInputChange={handleInputChange}
          clearFieldValidation={clearFieldValidation}
          validateField={validateField}
          type={'email'}
          name={'email'}
          placeholder={'Введите email'}
          label={'Email'}
          validation={validationData.email}
        />
        <Input
          value={values.phone}
          handleInputChange={handleInputChange}
          clearFieldValidation={clearFieldValidation}
          validateField={validateField}
          type={'phone'}
          name={'phone'}
          placeholder={'Введите телефон'}
          label={'Телефон'}
          validation={validationData.phone}
        />
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
        <Button disabled={!isFormValid} text={'Отправить'} />
      </Form>
    </>
  );
}
