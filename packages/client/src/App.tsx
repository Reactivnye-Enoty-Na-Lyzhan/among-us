import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Error404 } from './components/ErrorPage/ErrorPage';
import { LandingPage } from './components/LandingPage/LandingPage';
import ErrorToast from './components/ErrorToast/ErrorToast';
import { LoginPage } from './components/LoginPage/LoginPage';
import { SignUpPage } from './components/SignUpPage/SignUpPage';
import './App.css';

//placeholders
function ForumPage() {
  return <h1>Forum page</h1>;
}
function GamePage() {
  return <h1>Game</h1>;
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
