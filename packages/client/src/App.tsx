import { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Error404 } from './components/ErrorPage/ErrorPage';
import ErrorToast from './components/ErrorToast/ErrorToast';
import GamePage from './components/GamePage/GamePage';
import LandingPage from './components/LandingPage/LandingPage';
import LeaderBoard from './components/LeaderBoard/LeaderBoard';
import LoginPage from './components/LoginPage/LoginPage';
import Loader from './components/Loader/Loader';
import Profile from './components/Profile/Profile';
import SignUpPage from './components/SignUpPage/SignUpPage';
import ForumPage from './components/Forum/Page/Page';
import './App.css';

function App() {
  const [link, setLink] = useState<
    'Персональные данные' | 'Изменение пароля' | 'Аватар'
  >('Персональные данные');

  const handleChoiceChange = (
    choice: 'Персональные данные' | 'Изменение пароля' | 'Аватар'
  ) => {
    setLink(choice);
  };

  return (
    <Router>
      <div className="app app_theme_default">
        <ErrorToast />
        <Loader />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signin" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/game/*" element={<GamePage />} />
          <Route path="/leaderboard" element={<LeaderBoard />} />
          <Route path="/forum" element={<ForumPage />} />
          <Route
            path="/profile"
            element={
              <Profile choice={link} handleChoiceChange={handleChoiceChange} />
            }
          />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
