import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import './vendor/fonts/Inter-Regular.woff';
import './vendor/fonts/Inter-Medium.woff';
import './vendor/fonts/Inter-Bold.woff';
import { Error404 } from './components/ErrorPage/ErrorPage';
import './App.css';
import Page from './components/Forum/Page/Page';
import LoginPage from './components/LoginPage/LoginPage';
import ErrorToast from './components/ErrorToast/ErrorToast';
import './fonts/Inter-Regular.woff';
import './fonts/Inter-Medium.woff';
import './fonts/Inter-Bold.woff';

//placeholders
function GamePage() {
  return <h1>Game</h1>;
}
function SignUpPage() {
  return <h1>Registration</h1>;
}

function App() {
  return (
    <Router>
        <ErrorToast />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/forum" element={<Page />} />
        <Route path="*" element={<Error404/>} />
      </Routes>
    </Router>
  );
}

export default App;
