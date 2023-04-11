import Button from '@/components/Form/Button/Button';
import Form from '@/components/Form/Form';
import Input from '@/components/Form/Input/Input';
import { useForm } from '@/components/Form/hooks';
import { useValidation } from '@/hooks/useValidation';
import { validation } from '@/utils/validation';

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

  return (
    <Form
      onSubmit={() => {
        if (validateForm(values)) {
          console.log('SUBMIT', { values });
        }
      }}>
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
  );
}
