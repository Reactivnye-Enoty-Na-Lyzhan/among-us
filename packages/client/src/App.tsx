import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import { Error404 } from './components/ErrorPage/ErrorPage';
import LoginPage from './components/LoginPage/LoginPage';
import ErrorToast from './components/ErrorToast/ErrorToast';
import GamePage from './components/GamePage/GamePage';
import './App.css';

//placeholders
function ForumPage() {
  return <h1>Forum page</h1>;
}

function SignUpPage() {
  return <h1>Registration</h1>;
}

function App() {
  /* browser router вынести в main.tsx */
  return (
    <Router>
      <div className="app app_theme_default">
        <ErrorToast />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/game/*" element={<GamePage result="win" score={10} />} />
          <Route path="/forum" element={<ForumPage />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </div>
    </Router >
  );
}

export default App;
