import Button from '@/components/Form/Button/Button';
import Form from '@/components/Form/Form';
import Input from '@/components/Form/Input/Input';
import { useForm } from '@/components/Form/hooks';
import { useValidation } from '@/hooks/useValidation';
import { validation } from '@/utils/validation';
import { transformFormDataToDTO } from './_utils/transformFormDataToDTO';
import { SignUpFormData } from './_types';
import { useState } from 'react';
import { SignUpService } from '@/services/signup/signup.service';
import { getErrorMessage } from '@/services/signup/error-message/get-error-message';

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

  const [apiStatus, setApiStatus] = useState<string>('');

  const onSubmitHandler = async () => {
    if (!validateForm(values)) {
      return;
    }

    const data = transformFormDataToDTO(values as SignUpFormData);
    console.log(`FORM DATA: ${JSON.stringify(data)}`);
    try {
      const response = await SignUpService.signup(data);
      const { status } = response;
      const responseBody = await response.json();

      setApiStatus(getErrorMessage({ status, response: responseBody }));
    } catch (error) {
      console.error(`ERROR WHILE SIGNUP REQUEST: ${error}`);
      setApiStatus(`Непредвиденная ошибка клиента`);
    }
  };

  return (
    <>
      <div className="signup-page-main__api_error">{apiStatus}</div>
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
