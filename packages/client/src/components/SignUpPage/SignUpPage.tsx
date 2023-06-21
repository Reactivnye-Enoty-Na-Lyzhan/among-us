import hocAuth from '@/hoc/hocAuth';
import { Link } from 'react-router-dom';
import SignUpForm from './Form';
import './SignUpPage.css';

const SignUpPage: React.FC = () => {
  return (
    <div className="signup-page">
      <header className="signup-page-header signup-page-header_spacing_outer">
        <h1 className="signup-page-header__title">Добро пожаловать!</h1>
      </header>
      <main className="signup-page-main signup-page-main_spacing_outer">
        <SignUpForm></SignUpForm>
      </main>
      <footer className="signup-page-footer">
        <nav className="signup-page-navigation">
          <div className="signup-page-login-prompt">
            <span className="signup-page-login-prompt__title">
              Уже зарегистрированы?
            </span>
            <Link className="signup-page-login-prompt__link" to="/signin">
              Войти
            </Link>
          </div>
        </nav>
      </footer>
    </div>
  );
};

export default hocAuth(SignUpPage, {
  onUnauthenticatedRedirection: null,
  onAuthenticatedRedirection: '/game',
});
