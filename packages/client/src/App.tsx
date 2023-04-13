import { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Profile from './components/Profile/Profile';
import GamePage from './components/GamePage/GamePage';
import './vendor/fonts/Inter-Regular.woff';
import './vendor/fonts/Inter-Medium.woff';
import './vendor/fonts/Inter-Bold.woff';
import { Error404 } from './components/ErrorPage/ErrorPage';
import ErrorToast from './components/ErrorToast/ErrorToast';
import LeaderBoard from './components/LeaderBoard/LeaderBoard';
import LoginPage from './components/LoginPage/LoginPage';
import SignUpPage from './components/SignUpPage/SignUpPage';
import ForumPage from './components/Forum/Page/Page';
import './App.css';

function App() {
  const [link, setLink] = useState<"Персональные данные" | "Изменение пароля" | "Аватар">("Персональные данные");

  const handleChoiceChange = (choice: "Персональные данные" | "Изменение пароля" | "Аватар") => {
    setLink(choice);
  };

  return (
    <Router>
      <ErrorToast />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/game" element={<GamePage result="win" score={10} />} />
        <Route path="/leaderboard" element={<LeaderBoard />} />
        <Route path="/forum" element={<ForumPage />} />
        <Route path='/profile' element={<Profile choice={link} handleChoiceChange={handleChoiceChange}/>} />
        <Route path="*" element={<Error404/>} />
      </Routes>
    </Router>
  );
}

export default App;
