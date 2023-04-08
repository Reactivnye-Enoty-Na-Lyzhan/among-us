import Form from '../../Form/Form';
import Input from '../../Form/Input/Input';
import { useForm } from '../../Form/hooks';
import { validation } from '../../../utils/validation';
import Button from '../../Form/Button/Button';
import { useValidation } from '../../../hooks/useValidation';
import './ProfilePassword.css';

type Props = {
  choice: "Персональные данные" | "Изменение пароля" | "Аватар";
};

const ProfileForm: React.FunctionComponent<Props> = ({choice}) => {
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

  return(
    <div className='form'>
      <h1 className='form__title form__title_space_bottom'>Смена пароля члена экипажа</h1>
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
          placeholder={'Старый пароль'}
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
          placeholder={'Новый пароль'}
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
          placeholder={'Повторите новый пароль'}
          label={'Повторите новый пароль'}
          validation={validationData.comparePasswords}
        />
        <Button disabled={!isFormValid} text={'Изменить пароль'} />
      </Form>
    </div>
  );
};

export default ProfileForm;
