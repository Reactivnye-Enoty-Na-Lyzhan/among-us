import { useEffect } from 'react';
import Form from '../../Form/Form';
import Input from '../../Form/Input/Input';
import { useForm } from '../../Form/hooks';
import { validation } from '../../../utils/validation';
import Button from '../../Form/Button/Button';
import { useValidation } from '../../../hooks/useValidation';
import { useGetUserQuery } from '../../../store/auth/auth.slice';
import { useUpdateUserMutation } from '../../../store/profile/profile.slice';
import { User } from '../../../store/profile/profile.types';
import './ProfilePersonalData.css';

type Props = {
  choice: 'Персональные данные' | 'Изменение пароля' | 'Аватар';
};

const ProfileForm: React.FunctionComponent<Props> = ({ choice }) => {
  choice;
  const { values, handleInputChange, setValues } = useForm({});
  const [updateUser] = useUpdateUserMutation();
  const { data } = useGetUserQuery();

  useEffect(() => {
    if (data) {
      setValues({
        firstName: data.firstName,
        lastName: data.lastName,
        nickname: data.nickname,
        login: data.login,
        email: data.email,
        phone: data.phone,
      });
    }
  }, [data]);
  const handleFormSubmit = (data: User) => {
    console.log('это та самая дата', data);
    updateUser(data);
  };

  const {
    validationData,
    isFormValid,
    validateForm,
    validateField,
    clearFieldValidation,
  } = useValidation([
    { field: 'firstName', validation: validation.name },
    { field: 'lastName', validation: validation.name },
    { field: 'nickname', validation: validation.name },
    { field: 'email', validation: validation.email },
    { field: 'phone', validation: validation.phone },
    { field: 'login', validation: validation.login },
  ]);

  return (
    <div className="form">
      <h1 className="form__title">Карточка члена экипажа</h1>
      <Form
        onSubmit={() => {
          if (validateForm(values)) {
            handleFormSubmit(values as User);
          }
        }}>
        <Input
          value={values.firstName}
          handleInputChange={handleInputChange}
          clearFieldValidation={clearFieldValidation}
          validateField={validateField}
          type={'text'}
          name={'firstName'}
          placeholder={'Ёж'}
          label={'Имя'}
          validation={validationData.firstName}
        />
        <Input
          value={values.lastName}
          handleInputChange={handleInputChange}
          clearFieldValidation={clearFieldValidation}
          validateField={validateField}
          type={'text'}
          name={'lastName'}
          placeholder={'Космонавт'}
          label={'Фамилия'}
          validation={validationData.lastName}
        />
        <Input
          value={values.nickname}
          handleInputChange={handleInputChange}
          clearFieldValidation={clearFieldValidation}
          validateField={validateField}
          type={'text'}
          name={'nickname'}
          placeholder={'ezhvcosmose'}
          label={'Никнейм'}
          validation={validationData.nickname}
        />
        <Input
          value={values.email}
          handleInputChange={handleInputChange}
          clearFieldValidation={clearFieldValidation}
          validateField={validateField}
          type={'text'}
          name={'email'}
          placeholder={'ezh@v.cosmose'}
          label={'Почта'}
          validation={validationData.email}
        />
        <Input
          value={values.phone}
          handleInputChange={handleInputChange}
          clearFieldValidation={clearFieldValidation}
          validateField={validateField}
          type={'phone'}
          name={'phone'}
          placeholder={'+7-901-600-60-60'}
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
          placeholder={'Ёж'}
          label={'Логин'}
          validation={validationData.login}
        />

        <Button text={'Изменить данные'} disabled={!isFormValid} />
      </Form>
    </div>
  );
};

export default ProfileForm;
