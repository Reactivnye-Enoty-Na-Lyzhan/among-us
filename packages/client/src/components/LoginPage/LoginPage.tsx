import { FC, useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
import {
  useLazyGetServiceIdQuery,
  useYandexOAuthMutation,
} from '../../store/auth/oauth.slice';
import { useLazyGetUserQuery } from '../../store/auth/auth.slice';
import { redirectToOAuthYandex } from '../../utils/oauth/redirectToOAuthYandex';
import { getRedirectUrl } from '../../utils/oauth/getRedirectUrl';
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
  const [getServiceId] = useLazyGetServiceIdQuery();
  const [yandexOAuth] = useYandexOAuthMutation();
  const [getUser] = useLazyGetUserQuery();
  const navigate = useNavigate();

  const location = useLocation();

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

  const handleOAuthSignIn = useCallback(async () => {
    try {
      const { data } = await getServiceId();
      const serviceId = data?.service_id;
      serviceId && redirectToOAuthYandex(serviceId);
    } catch (error) {
      console.log(`Oops, ${error} `);
    }
  }, [getServiceId]);

  useEffect(() => {
    const fetchData = async () => {
      const searchParams = new URLSearchParams(location.search);
      const code = searchParams.get('code');
      if (code) {
        try {
          console.log(code);
          const { isSuccess } = await yandexOAuth({
            code,
            redirect_uri: getRedirectUrl(),
          }).unwrap();
          if (isSuccess) {
            const user = await getUser();
            if (user) {
              navigate('/game');
            }
          }
        } catch (error) {
          console.log(`Oops, ${error} `);
        }
      }
    };

    fetchData();
  }, [location.search, yandexOAuth, getUser, navigate]);

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
