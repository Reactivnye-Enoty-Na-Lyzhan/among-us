import { FC, memo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { pluralSeconds } from '../../../../utils/plural';
import './AwaitStart.css';

type GameSettingsType = {
  meeting: number;
  discussion: number;
  interval: number;
};

type Props = {
  onCancel: () => void;
};

// Экран ожидания начала игры
const AwaitStart: FC<Props> = props => {
  const { onCancel } = props;

  const [counter, setCounter] = useState<number>(60);

  const navigate = useNavigate();

  // Обратный отсчёт
  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);

  // Временный объект
  const gameSettings: GameSettingsType = {
    meeting: 5,
    discussion: 50,
    interval: 30,
  };

  const heading = counter > 0 ? 'Старт игры через' : 'Игра начинается!';
  const pluralRules = new Intl.PluralRules('ru-RU');
  const pluralDiscussion = pluralRules.select(gameSettings.discussion);
  const pluralInterval = pluralRules.select(gameSettings.interval);

  // Выход из игры
  const handleExitGame = () => {
    // отмена игры
    onCancel();
    navigate('..');
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
            <span className="await-start__param-value">
              {gameSettings.meeting}
            </span>
          </li>
          <li className="await-start__list-item">
            <h2 className="await-start__param-name">Время на обсуждение:</h2>
            <span className="await-start__param-value">
              {gameSettings.discussion} {pluralSeconds[pluralDiscussion]}
            </span>
          </li>
          <li className="await-start__list-item">
            <h2 className="await-start__param-name">
              Перерыв между собраниями:
            </h2>
            <span className="await-start__param-value">
              {gameSettings.interval} {pluralSeconds[pluralInterval]}
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