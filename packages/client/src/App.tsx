import { Route, Routes } from 'react-router-dom';
import ErrorToast from './components/ErrorToast/ErrorToast';
import Loader from './components/Loader/Loader';
import './App.css';
import { routes } from './routes';

function App() {
  return (
    <div className="app app_theme_default">
      <ErrorToast />
      <Loader />
      <Routes>
        {routes.map(route => (
          <Route key={route.path} {...route} />
        ))}
      </Routes>
    </div>
  );
}

export default App;
