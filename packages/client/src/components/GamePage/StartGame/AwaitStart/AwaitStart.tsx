import { FC, memo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useActions } from '@/hooks/useActions';
import { getPluralSeconds } from '@/utils/helpers/getPlural';
import './AwaitStart.css';

// Экран ожидания начала игры
const AwaitStart: FC = () => {
  const { params, startCooldown } = useTypedSelector(state => state.game);
  const [counter, setCounter] = useState<number>(startCooldown);

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
  const handleExitGame = () => {
    // отмена игры
    cancelGame();
    navigate('/game');
  };

  return (
    <div className="await-start">
      <div className="await-start__timer">
        <h1 className="await-start__title">{heading}</h1>
        {counter > 0 && (
          <span className="await-start__time-left">
            {counter} * 10<sup className="await-start__degree">3</sup> мс
          </span>
        )}
        {counter === 0 && (
          <span className="await-start__time-left">
            Скоро ты всё узнаешь...
          </span>
        )}
      </div>
      <div className="await-start__content">
        <ul className="await-start__settings-list">
          <li className="await-start__list-item">
            <h2 className="await-start__param-name">Экстренных собраний:</h2>
            <span className="await-start__param-value">{params.meetings}</span>
          </li>
          <li className="await-start__list-item">
            <h2 className="await-start__param-name">Время на обсуждение:</h2>
            <span className="await-start__param-value">
              {params.meetingDuration}{' '}
              {getPluralSeconds(params.meetingDuration)}
            </span>
          </li>
          <li className="await-start__list-item">
            <h2 className="await-start__param-name">
              Перерыв между собраниями:
            </h2>
            <span className="await-start__param-value">
              {params.meetingCooldown}{' '}
              {getPluralSeconds(params.meetingCooldown)}
            </span>
          </li>
        </ul>
        <div className="await-start__crewman"></div>
      </div>
      <button
        className="await-start__leave-game"
        type="button"
        onClick={handleExitGame}>
        Выйти из игры
      </button>
    </div>
  );
};

export default memo(AwaitStart);
