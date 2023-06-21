import hocAuth from '@/hoc/hocAuth';
import { SignInRequestDTO } from '@/store/auth/auth.types';
import { FC, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useOAuth from '../../hooks/useOAuth';
import { useValidation } from '../../hooks/useValidation';
import { validation } from '../../utils/validation';
import Button from '../Form/Button/Button';
import Form from '../Form/Form';
import Input from '../Form/Input/Input';
import OAuthButton from '../Form/OAuthButton/OAuthButton';
import { useForm } from '../Form/hooks';
import { useSignIn } from './hooks/useSignIn';
import './LoginPage.css';

const LoginPage: FC = () => {
  const { requestStatus, statusMessageClass, signIn, sendSignInQueryStatus } =
    useSignIn();

  const { values, handleInputChange } = useForm({ login: '', password: '' });
  const {
    validationData,
    isFormValid,
    validateForm,
    validateField,
    clearFieldValidation,
  } = useValidation([
    { field: 'login', validation: validation.login },
    { field: 'password', validation: validation.password },
  ]);
  const { handleOAuthSignIn, requestToken } = useOAuth();
  const navigate = useNavigate();

  async function handleSubmit() {
    if (!validateForm(values)) {
      return;
    }
    if (sendSignInQueryStatus.isLoading) {
      return;
    }
    const success = await signIn({
      login: values.login,
      password: values.password,
    } as SignInRequestDTO);
    success && navigate('/game');
  }

  useEffect(() => {
    requestToken();
  }, [requestToken]);

  return (
    <div className="login-page">
      <div className="login-page__container">
        <h1 className="login-page__title">Рады видеть!</h1>
        <div className={'login-page__status ' + statusMessageClass}>
          {requestStatus}
        </div>
        <Form onSubmit={handleSubmit}>
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
          <div className="login-page__text login-page__text_space_around">
            или
          </div>
          <OAuthButton
            onClick={handleOAuthSignIn}
            text="Войти с Яндекс ID"
            disabled={false}
          />
        </Form>
        <div className="login-page__footer">
          <span>Ещё не зарегистрированы?</span>
          <Link to={'/signup'} className="login-page__link">
            Регистрация
          </Link>
        </div>
      </div>
    </div>
  );
};

export default hocAuth(LoginPage, {
  onUnauthenticatedRedirection: null,
  onAuthenticatedRedirection: '/game',
});
