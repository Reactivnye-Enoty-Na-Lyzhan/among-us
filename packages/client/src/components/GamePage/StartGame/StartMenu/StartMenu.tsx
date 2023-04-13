import { FC, memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import './StartMenu.css';

type Props = {
  onStart: () => void;
};

// Меню игрового выбора
const StartMenu: FC<Props> = props => {
  const { onStart } = props;

  const navigate = useNavigate();

  // Временное решение для демонстрации прототипа
  const handleStart = () => {
    // действие
    onStart();
    navigate('./assembling');
  };

  return (
    <div className="start-menu">
      <h1 className="start-menu__title">
        Давай, начинай уже, так хочется увидеть тебя в действии
      </h1>
      <div className="start-menu__container">
        <div className="start-menu__controls">
          <button
            className="start-menu__fast-start"
            onClick={handleStart}
            type="button">
            Быстрая игра
          </button>
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
