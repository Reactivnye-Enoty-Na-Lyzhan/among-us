import Form from '../../Form/Form';
import Input from '../../Form/Input/Input';
import { useForm } from '../../Form/hooks';
import { validation } from '../../../utils/validation';
import Button from '../../Form/Button/Button';
import { useValidation } from '../../../hooks/useValidation';
import './ProfilePassword.css';

type Props = {
  choice: 'Персональные данные' | 'Изменение пароля' | 'Аватар';
};

const ProfileForm: React.FunctionComponent<Props> = ({ choice }) => {
  choice;
  const { values, handleInputChange } = useForm({});
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

  return (
    /* Временно изменил класс с form на profile-form. У тебя ниже идёт снова class Form*/
    <div className="profile-form">
      <h1 className="profile-form__title profile-form__title_space_bottom">
        Смена пароля члена экипажа
      </h1>
      <Form
        onSubmit={() => {
          if (validateForm(values)) {
            console.log('SUBMIT', { values });
          }
        }}>
        <Input
          value={values.oldPassword}
          handleInputChange={handleInputChange}
          clearFieldValidation={clearFieldValidation}
          validateField={validateField}
          type={'password'}
          name={'oldPassword'}
          placeholder={''}
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
          placeholder={''}
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
          placeholder={''}
          label={'Повторите новый пароль'}
          validation={validationData.password}
        />
        <Button disabled={!isFormValid} text={'Изменить пароль'} />
      </Form>
    </div>
  );
};

export default ProfileForm;
