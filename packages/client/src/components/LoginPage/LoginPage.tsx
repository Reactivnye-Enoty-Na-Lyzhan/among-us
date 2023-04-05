import { LoginPageForm } from './Form/Form';

const LoginPage: React.FC = () => {
  return (
    <div
      style={{
        backgroundColor: '#010318',
        width: '100%',
        padding: '40px',
      }}>
      <LoginPageForm></LoginPageForm>
    </div>
  );
};

export default LoginPage;
