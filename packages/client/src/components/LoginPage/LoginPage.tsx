import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Form from '../Form/Form';
import Input from '../Form/Input/Input';
import { useForm } from '../Form/hooks';
import { validation } from '../../utils/validation';
import Button from '../Form/Button/Button';
import { useValidation } from '../../hooks/useValidation';
import { useSignIn } from './hooks/useSignIn';
import hocAuth from '@/hoc/hocAuth';
import { SignInRequestDTO } from '@/store/auth/auth.types';
import { useSignInWithYandexMutation } from '../../store/auth/auth.slice';
import './LoginPage.css';

const LoginPage: FC = () => {
  const [ signInWithYandex ] = useSignInWithYandexMutation();
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

  const navigate = useNavigate();

  async function handleSubmit() {
    if (!validateForm(values)) {
      return;
    }
    if (sendSignInQueryStatus.isLoading) {
      return;
    }
    const success = await signIn(values as SignInRequestDTO);
    success && navigate('/game');
  }

  const CLIENT_ID='3abae5eaea504f2c8c65eb8221895700';
  const REDIRECT_URI='http://localhost:3000/signin';

  const handleRedirectToOAuth = () => {
    window.location.href = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`;
    };

  useEffect(() => {
    const code = new URLSearchParams(globalThis.window?.location.search).get('code');
    if (code) {
      signInWithYandex({ code: code, redirect_uri: 'http://localhost:3000/signin'});
    } else {
      return console.log('Oops');
    }
  }, []);

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
          <Button disabled={!isFormValid} text={'Отправить'} onClick={handleSubmit}/>
          <Button onClick={handleRedirectToOAuth} text="Авторизоваться через Яндекс" disabled={false}/>

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
  // onAuthenticatedRedirection: '/game',
});
