import Form from '../../Form/Form';
import Input from '../../Form/Input/Input';
import { useForm } from '../../Form/hooks';
import { validation } from '../../../utils/validation';
import Button from '../../Form/Button/Button';
import { useValidation } from '../../../hooks/useValidation';
import { useUpdatePasswordMutation } from '../../../store/profile/profile.slice';
import './ProfilePassword.css';

type Props = {
  choice: 'Персональные данные' | 'Изменение пароля' | 'Аватар';
};

const ProfileForm: React.FunctionComponent<Props> = ({ choice }) => {
  choice;
  const { values, handleInputChange } = useForm({});
  const [updatePassword, { isLoading }] = useUpdatePasswordMutation();
  const {
    validationData,
    isFormValid,
    validateForm,
    validateField,
    clearFieldValidation,
  } = useValidation([
    { field: 'oldPassword', validation: validation.password },
    { field: 'newPassword', validation: validation.password },
    { field: 'repeatPassword', validation: (value: string | undefined) => validation.comparePasswords(value, values.newPassword) },
  ]);

  return (
    <div className="profile-form">
      <h1 className="profile-form__title profile-form__title_space_bottom">
        Смена пароля члена экипажа
      </h1>
      <Form
        onSubmit={async () => {
          if (validateForm(values)) {
            const oldPassword = values.oldPassword || '';
            const newPassword = values.newPassword || '';
            if (oldPassword && newPassword) {
              try {
                await updatePassword({ oldPassword, newPassword });
                console.log('Password updated successfully');
              } catch (err) {
                console.log('Failed to update password', err);
              }
            }
          }
        }}
      >
        <Input
          value={values.oldPassword}
          handleInputChange={handleInputChange}
          clearFieldValidation={clearFieldValidation}
          validateField={validateField}
          type={'password'}
          name={'oldPassword'}
          placeholder={''}
          label={'Старый пароль'}
          validation={validationData.oldPassword}
        />
        <Input
          value={values.newPassword}
          handleInputChange={handleInputChange}
          clearFieldValidation={clearFieldValidation}
          validateField={validateField}
          type={'password'}
          name={'newPassword'}
          placeholder={''}
          label={'Новый пароль'}
          validation={validationData.newPassword}
        />
        <Input
          value={values.repeatPassword}
          handleInputChange={handleInputChange}
          clearFieldValidation={clearFieldValidation}
          validateField={validateField}
          type={'password'}
          name={'repeatPassword'}
          placeholder={''}
          label={'Повторите новый пароль'}
          validation={validationData.repeatPassword}
        />
        <Button disabled={!isFormValid} text={'Изменить пароль'} />
      </Form>
      {isLoading && <span>Updating Password...</span>}
    </div>
  );
};

export default ProfileForm;
