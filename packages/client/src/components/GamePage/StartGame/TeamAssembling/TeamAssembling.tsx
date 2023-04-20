import { memo, FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useActions } from '@/hooks/useActions';
import Navigation from '../Navigation/Navigation';
import './TeamAssembling.css';

// Экран подбора команды
const TeamAssembling: FC = () => {
  const [isSearching, setIsSearching] = useState<boolean>(true);
  const [counter, setCounter] = useState<number>(0);

  const { cancelGame } = useActions();

  const navigate = useNavigate();

  // Для прототипа
  useEffect(() => {
    const timeout = setTimeout(() => navigate('../preparing'), 5000);

    return () => clearTimeout(timeout);
  }, []);

  // Отсчёт. В дальнейшем будет связан со временем создания игры
  useEffect(() => {
    isSearching && setTimeout(() => setCounter(counter + 1), 1000);
  }, [counter, isSearching]);

  // Отмена поиска игры
  function handleCancelSearch() {
    setIsSearching(false);
    cancelGame();
    navigate('..');
  }

  return (
    <div className="team-assembling">
      <h1 className="team-assembling__title">Не вздумай отменять</h1>
      <div className="team-assembling__container">
        <div className="team-assembling__content">
          <h2 className="team-assembling__status">Подбираем команду</h2>
          <div className="team-assembling__timer">
            <span className="team-assembling__timer-title">Прошло уже:</span>
            <span className="team-assembling__count">
              {counter} * 10<sup className="team-assembling__degree">3</sup> мс
            </span>
          </div>
          <button
            className="team-assembling__stop-button"
            onClick={handleCancelSearch}>
            Отменить поиск игры
          </button>
        </div>
        <div className="team-assembling__crewman">
          <div className="team-assembling__magnifier"></div>
        </div>
      </div>
      <Navigation />
    </div>
  );
};

export default memo(TeamAssembling);
