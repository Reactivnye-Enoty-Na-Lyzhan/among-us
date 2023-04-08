import { Link } from 'react-router-dom';
import SignUpForm from './Form/Form';
import './SignUpPage.css';

const SignUpPage: React.FC = () => {
  return (
    <div className="signup-page">
      <header className="signup-page-header">
        <h1 className="signup-page-header__title">Добро Пожаловать!</h1>
      </header>
      <main className="signup-page-main">
        <SignUpForm></SignUpForm>
      </main>
      <footer className="signup-page-footer">
        <nav className="signup-page-navigation">
          <div className="login-prompt">
            <span className="login-prompt__title">Уже зарегистрированы?</span>
            <Link className="login-prompt__link" to="/login">
              Войти
            </Link>
          </div>
        </nav>
      </footer>
    </div>
  );
};

export default SignUpPage;
