import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage/LoginPage';
import './fonts/Inter-Regular.woff';
import './fonts/Inter-Medium.woff';
import './fonts/Inter-Bold.woff';
import ErrorNotification from './components/ErrorToast/ErrorToast';

//placeholders
function HomePage() {
  return <h1>Landing page</h1>;
}
function ForumPage() {
  return <h1>Forum page</h1>;
}
function GamePage() {
  return <h1>Game</h1>;
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
        <ErrorNotification />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/forum" element={<ForumPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
