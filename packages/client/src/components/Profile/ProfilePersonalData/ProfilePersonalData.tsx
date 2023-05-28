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
        first_name: data.firstName,
        second_name: data.lastName,
        display_name: data.nickname,
        login: data.username,
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
    { field: 'first_name', validation: validation.name },
    { field: 'second_name', validation: validation.name },
    { field: 'display_name', validation: validation.name },
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
          value={values.first_name}
          handleInputChange={handleInputChange}
          clearFieldValidation={clearFieldValidation}
          validateField={validateField}
          type={'text'}
          name={'first_name'}
          placeholder={'Ёж'}
          label={'Имя'}
          validation={validationData.first_name}
        />
        <Input
          value={values.second_name}
          handleInputChange={handleInputChange}
          clearFieldValidation={clearFieldValidation}
          validateField={validateField}
          type={'text'}
          name={'second_name'}
          placeholder={'Космонавт'}
          label={'Фамилия'}
          validation={validationData.second_name}
        />
        <Input
          value={values.display_name}
          handleInputChange={handleInputChange}
          clearFieldValidation={clearFieldValidation}
          validateField={validateField}
          type={'text'}
          name={'display_name'}
          placeholder={'ezhvcosmose'}
          label={'Никнейм'}
          validation={validationData.display_name}
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
