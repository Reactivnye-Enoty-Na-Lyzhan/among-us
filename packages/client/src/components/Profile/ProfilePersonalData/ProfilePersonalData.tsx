import { FC, useCallback, useEffect, useState } from 'react';
import Form from '../../Form/Form';
import Input from '../../Form/Input/Input';
import { useForm } from '../../Form/hooks';
import { validation } from '../../../utils/validation';
import Button from '../../Form/Button/Button';
import { useValidation } from '../../../hooks/useValidation';
import { useLazyGetUserQuery } from '../../../store/auth/auth.slice';
import { useUpdateUserMutation } from '../../../store/profile/profile.slice';
import { useActions } from '@/hooks/useActions';
import type { User } from '../../../store/profile/profile.types';
import './ProfilePersonalData.css';

const ProfileForm: FC = () => {
  const [isDataChanged, setIsDataChanged] = useState<boolean>(false);
  const { values, handleInputChange, setValues } = useForm({});

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
  ]);

  const [updateUser] = useUpdateUserMutation();
  const [getUser, results] = useLazyGetUserQuery();

  const { setApiError } = useActions();

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (results.data) {
      setValues({
        firstName: results.data.firstName,
        lastName: results.data.lastName,
        nickname: results.data.nickname,
        email: results.data.email,
        phone: results.data.phone,
      });
    }
  }, [results]);

  useEffect(() => {
    if (!isDataChanged) return;

    const timeout = setTimeout(() => {
      setIsDataChanged(false);
    }, 5500);

    return () => {
      clearTimeout(timeout);
    };
  }, [isDataChanged]);

  const handleFormSubmit = useCallback(async () => {
    try {
      if (!validateForm(values)) return;

      const hasChanged = Object.keys(values).some(key => {
        if (results.data) {
          return values[key] !== results.data[key as keyof User];
        }
      });

      if (!hasChanged) return;

      const newUser = await updateUser(values as User);

      if ('error' in newUser) {
        setApiError({
          code: 400,
          message: 'При обновлении пользователя произошла ошибка',
        });

        return;
      }

      setValues({
        firstName: newUser.data.firstName,
        lastName: newUser.data.lastName,
        nickname: newUser.data.nickname,
        email: newUser.data.email,
        phone: newUser.data.phone,
      });

      setIsDataChanged(true);
      await getUser();
    } catch (err: unknown) {
      console.log(err);
    }
  }, [values]);

  return (
    <div className="profile-personal">
      <h3 className="profile-personal__title">Карточка члена экипажа</h3>
      <Form onSubmit={handleFormSubmit}>
        {isDataChanged && (
          <span className="profile-password__informer">
            Данные успешно обновлены!
          </span>
        )}
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

        <Button text={'Изменить данные'} disabled={!isFormValid} />
      </Form>
    </div>
  );
};

export default ProfileForm;
