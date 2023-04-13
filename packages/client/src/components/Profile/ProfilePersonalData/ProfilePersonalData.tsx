import Form from '../../Form/Form';
import Input from '../../Form/Input/Input';
import { useForm } from '../../Form/hooks';
import { validation } from '../../../utils/validation';
import Button from '../../Form/Button/Button';
import { useValidation } from '../../../hooks/useValidation';
import './ProfilePersonalData.css';

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
    { field: 'name', validation: validation.name },
    { field: 'lastName', validation: validation.name },
    { field: 'nickname', validation: validation.name },
    { field: 'email', validation: validation.email },
    { field: 'phone', validation: validation.phone },
    { field: 'login', validation: validation.login },
  ]);

  return(
    <div className='form'>
        <h1 className='form__title'>Карточка члена экипажа</h1>
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
          placeholder={'Ёж'}
          label={'Имя'}
          validation={validationData.name}
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
        
        <Button disabled={!isFormValid} text={'Изменить данные'} />
      </Form>
    </div>
  );
};

export default ProfileForm;
