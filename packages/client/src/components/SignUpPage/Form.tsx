import Button from '@/components/Form/Button/Button';
import Form from '@/components/Form/Form';
import Input from '@/components/Form/Input/Input';
import { useForm } from '@/components/Form/hooks';
import { useValidation } from '@/hooks/useValidation';
import { validation } from '@/utils/validation';
import { transformFormDataToDTO } from './_utils/transformFormDataToDTO';
import { SignUpFormData } from './_types';
import { useCallback, useRef, useState } from 'react';
import { SignUpService } from '@/services/signup/signup.service';
import { getErrorMessage } from '@/services/signup/error-message/get-error-message';
import { useLazyGetUserQuery } from '@/store/auth/auth.slice';
import { useNavigate } from 'react-router-dom';

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

  const [signupQueryError, setSignupQueryError] = useState<string | null>(null);
  const [triggerGetUserQuery, getUserQueryStatus] = useLazyGetUserQuery();

  const onSubmitHandler = useCallback(async () => {
    if (!validateForm(valuesRef.current)) {
      return;
    }

    const data = transformFormDataToDTO(valuesRef.current as SignUpFormData);
    console.log(`FORM DATA: ${JSON.stringify(data)}`);
    try {
      const signupResponse = await SignUpService.signup(data);
      const signupResponseBody = await signupResponse.json();

      setSignupQueryError(
        getErrorMessage({
          status: signupResponse.status,
          response: signupResponseBody,
        })
      );
    } catch (error) {
      console.error(`ERROR WHILE SIGNUP REQUEST: ${error}`);
      setSignupQueryError(`Непредвиденная ошибка клиента`);
    }

    try {
      await triggerGetUserQuery();
    } catch (error) {
      console.error(`ERROR WHILE GET USER: ${error}`);
      setSignupQueryError(`Непредвиденная ошибка клиента`);
    }
  }, []);

  if (signupQueryError === '') {
    setSignupQueryError('Регистрация прошла успешно');

    if (getUserQueryStatus.isSuccess) {
      setTimeout(() => navigate('/game'), 4000);
    } else {
      setTimeout(() => navigate('/login'), 4000);
    }
  }

  return (
    <>
      <div className="signup-page-main__api_error">{signupQueryError}</div>
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
