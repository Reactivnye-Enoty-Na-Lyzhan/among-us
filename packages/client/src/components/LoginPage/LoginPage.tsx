import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Form from '../Form/Form';
import Input from '../Form/Input/Input';
import { useForm } from '../Form/hooks';
import { validation } from '../../utils/validation';
import Button from '../Form/Button/Button';
import OAuthButton from '../Form/OAuthButton/OAuthButton';
import { useValidation } from '../../hooks/useValidation';
import { useSignIn } from './hooks/useSignIn';
import hocAuth from '@/hoc/hocAuth';
import { SignInRequestDTO } from '@/store/auth/auth.types';
import useOAuth from '../../hooks/useOAuth';
import './LoginPage.css';

const LoginPage: FC = () => {
  const { requestStatus, statusMessageClass, signIn, sendSignInQueryStatus } =
    useSignIn();

  const { values, handleInputChange } = useForm({ username: '', password: '' });
  const {
    validationData,
    isFormValid,
    validateForm,
    validateField,
    clearFieldValidation,
  } = useValidation([
    { field: 'username', validation: validation.login },
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
            value={values.username}
            handleInputChange={handleInputChange}
            clearFieldValidation={clearFieldValidation}
            validateField={validateField}
            type={'text'}
            name={'username'}
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
