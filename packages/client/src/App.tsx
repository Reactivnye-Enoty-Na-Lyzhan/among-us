import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import GamePage from './components/GamePage/GamePage';
import './App.css';

//placeholders
function ForumPage() {
  return <h1>Forum page</h1>;
}

function LoginPage() {
  return <h1>Login</h1>;
}
function SignUpPage() {
  return <h1>Registration</h1>;
}
function NotFound() {
  return <h1>404</h1>;
}

function App() {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/game" element={<GamePage result="win" score={10} />} />
            <Route path="/forum" element={<ForumPage />} />
            <Route path="*" element={<NotFound/>} />
        </Routes>
    </Router>
  );
}

export default App;
