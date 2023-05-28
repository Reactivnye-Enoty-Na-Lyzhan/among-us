import { FC, memo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useActions } from '@/hooks/useActions';
import { selectGame } from '@/store/game/game.slice';
import { useLeaveGameMutation } from '@/store/game/game.api';
import { getPluralSeconds } from '@/utils/helpers/getPlural';
import './StartAwaiting.css';

// Экран ожидания начала игры
const AwaitStart: FC = () => {
  const { params, startCooldown } = useTypedSelector(state => state.game);
  const [counter, setCounter] = useState<number>(startCooldown);
  
  // Состояние
  const gameId = useTypedSelector(selectGame);

  // Запросы
  const [leaveGame] = useLeaveGameMutation();

  const { launchGame, cancelGame } = useActions();
  const navigate = useNavigate();

  // Обратный отсчёт
  useEffect(() => {
    if (counter > 0) {
      setTimeout(() => setCounter(counter - 1), 1000);
    } else {
      launchGame();
      navigate('/game');
    }
  }, [counter]);

  const heading = counter > 0 ? 'Старт игры через' : 'Игра начинается!';

  // Выход из игры
  const handleExitGame = async () => {
    // отмена игры
    if (gameId) {
      await leaveGame({
        gameId,
      });
    }
    cancelGame();
  };

  return (
    <div className="start-awaiting">
      <div className="start-awaiting__timer">
        <h1 className="start-awaiting__title">{heading}</h1>
        {counter > 0 && (
          <span className="start-awaiting__time-left">
            {counter} * 10<sup className="start-awaiting__degree">3</sup> мс
          </span>
        )}
        {counter === 0 && (
          <span className="start-awaiting__time-left">
            Скоро ты всё узнаешь...
          </span>
        )}
      </div>
      <div className="start-awaiting__content">
        <ul className="start-awaiting__settings-list">
          <li className="start-awaiting__list-item">
            <h2 className="start-awaiting__param-name">Экстренных собраний:</h2>
            <span className="start-awaiting__param-value">{params.meetings}</span>
          </li>
          <li className="start-awaiting__list-item">
            <h2 className="start-awaiting__param-name">Время на обсуждение:</h2>
            <span className="start-awaiting__param-value">
              {params.discussion}{' '}
              {getPluralSeconds(params.discussion)}
            </span>
          </li>
          <li className="start-awaiting__list-item">
            <h2 className="start-awaiting__param-name">
              Перерыв между собраниями:
            </h2>
            <span className="start-awaiting__param-value">
              {params.interval}{' '}
              {getPluralSeconds(params.interval)}
            </span>
          </li>
        </ul>
        <div className="start-awaiting__crewman"></div>
      </div>
      <button
        className="start-awaiting__leave-game"
        type="button"
        onClick={handleExitGame}>
        Выйти из игры
      </button>
    </div>
  );
};

export default memo(AwaitStart);
