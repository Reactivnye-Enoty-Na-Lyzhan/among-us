import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import { Error404 } from './components/ErrorPage/ErrorPage';
import ForumPage from './components/Forum/Page/Page';
import LoginPage from './components/LoginPage/LoginPage';
import ErrorToast from './components/ErrorToast/ErrorToast';
import './App.css';

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
        <Route path="/forum" element={<ForumPage />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </Router>
  );
}

export default App;
