import { FC, useCallback, useEffect, useState } from 'react';
import Form from '../../Form/Form';
import Input from '../../Form/Input/Input';
import { useForm } from '../../Form/hooks';
import { validation } from '../../../utils/validation';
import Button from '../../Form/Button/Button';
import { useValidation } from '../../../hooks/useValidation';
import { useChangePasswordMutation } from '@/store/profile/profile.slice';
import { useActions } from '@/hooks/useActions';
import './ProfilePassword.css';

const ProfileForm: FC = () => {
  const [isPasswordChanged, setIsPasswordChanged] = useState<boolean>(false);
  const { values, handleInputChange, setValues } = useForm({});
  const [changePassword] = useChangePasswordMutation();

  const {
    validationData,
    isFormValid,
    validateForm,
    validateField,
    clearFieldValidation,
  } = useValidation([
    { field: 'oldPassword', validation: validation.password },
    { field: 'newPassword', validation: validation.password },
    { field: 'repeatPassword', validation: validation.password },
  ]);

  const { setApiError } = useActions();

  useEffect(() => {
    if (!isPasswordChanged) return;

    const timeout = setTimeout(() => {
      setIsPasswordChanged(false);
    }, 3500);

    return () => {
      clearTimeout(timeout);
    };
  }, [isPasswordChanged]);

  const handleFormSubmit = useCallback(async () => {
    try {
      if (!validateForm(values)) return;

      if (!values.oldPassword || !values.newPassword) return;

      const changePasswordRequest = await changePassword({
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      });

      console.log(changePasswordRequest);

      if ('error' in changePasswordRequest) {
        setApiError({
          code: 400,
          message: 'Что-то пошло не так при изменении пароля!',
        });
        return;
      }

      setValues({
        oldPassword: '',
        newPassword: '',
        repeatPassword: '',
      });

      setIsPasswordChanged(true);
    } catch (err: unknown) {
      console.log(err);
    }
  }, [values]);

  return (
    <div className="profile-password">
      <h3 className="profile-password__title">Смена пароля члена экипажа</h3>
      <Form onSubmit={handleFormSubmit}>
        {isPasswordChanged && (
          <span className="profile-password__informer">
            Пароль успешно изменён
          </span>
        )}
        <Input
          value={values.oldPassword}
          handleInputChange={handleInputChange}
          clearFieldValidation={clearFieldValidation}
          validateField={validateField}
          type={'password'}
          name={'oldPassword'}
          placeholder={'********'}
          label={'Старый пароль'}
          validation={validationData.password}
        />
        <Input
          value={values.newPassword}
          handleInputChange={handleInputChange}
          clearFieldValidation={clearFieldValidation}
          validateField={validateField}
          type={'password'}
          name={'newPassword'}
          placeholder={'********'}
          label={'Новый пароль'}
          validation={validationData.password}
        />
        <Input
          value={values.repeatPassword}
          handleInputChange={handleInputChange}
          clearFieldValidation={clearFieldValidation}
          validateField={validateField}
          type={'password'}
          name={'repeatPassword'}
          placeholder={'********'}
          label={'Повторите новый пароль'}
          validation={validationData.password}
        />
        <Button disabled={!isFormValid} text={'Изменить пароль'} />
      </Form>
    </div>
  );
};

export default ProfileForm;
