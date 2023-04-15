import { FC, memo } from 'react';
import { Link } from 'react-router-dom';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { selectOnline } from '@/store/game/game.slice';
import { useActions } from '@/hooks/useActions';
import Navigation from '../Navigation/Navigation';
import './StartMenu.css';

// Меню игрового выбора
const StartMenu: FC = () => {
  const isOnline = useTypedSelector(selectOnline);
  const { startFastGame } = useActions();

  const handleStart = () => {
    startFastGame();
  };

  return (
    <div className="start-menu">
      <h1 className="start-menu__title">
        Давай, начинай уже, так хочется увидеть тебя в действии
      </h1>
      <div className="start-menu__container">
        <div className="start-menu__controls">
          <Link
            to={isOnline ? 'assembling' : 'preparing'}
            className="start-menu__fast-start"
            onClick={handleStart}>
            Быстрая игра
          </Link>
          <span className="start-menu__controls-divider">или</span>
          <Link to="find" className="start-menu__start-game">
            Найти нужную игру
          </Link>
          <Link
            to="create"
            className="start-menu__start-game start-menu__start-game_action_create">
            Создать свою игру
          </Link>
        </div>
        <div className="start-menu__crewman"></div>
      </div>
      <Navigation />
    </div>
  );
};

export default memo(StartMenu);
