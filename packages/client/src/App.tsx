import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';

import './App.css';
import Page from './components/Forum/Page/Page';

//placeholders
function GamePage() {
  return <h1>Game</h1>;
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
        <Route path="/game" element={<GamePage />} />
        <Route path="/forum" element={<Page />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
