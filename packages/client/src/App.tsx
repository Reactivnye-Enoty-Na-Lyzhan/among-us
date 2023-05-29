import { Route, Routes } from 'react-router-dom';
import ErrorToast from './components/ErrorToast/ErrorToast';
import Loader from './components/Loader/Loader';
import './App.css';
import { routes } from './routes';
import useTheme from './hooks/useTheme';

function App() {
  const { themeClassName } = useTheme();

  return (
    <div className={`app ${themeClassName}`}>
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
