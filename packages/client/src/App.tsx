import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Error404 } from './components/ErrorPage/ErrorPage';
import ErrorToast from './components/ErrorToast/ErrorToast';
import GamePage from './components/GamePage/GamePage';
import LoginPage from './components/LoginPage/LoginPage';
import LandingPage from './components/LandingPage/LandingPage';
import SignUpPage from './components/SignUpPage/SignUpPage';
import './App.css';

//placeholders
function ForumPage() {
  return <h1>Forum page</h1>;
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
