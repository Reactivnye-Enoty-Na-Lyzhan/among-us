import { FC, memo, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { useActions } from '@/hooks/useActions';
import Navigation from '../Navigation/Navigation';
import FoundGame from './FoundGame/FoundGame';
import {
  existingGames,
  additionalGamesList,
  ExistingGamesType,
} from '../../../../utils/tempConstants';
import { gameNamePattern } from '../../../../utils/gameParams';
import './SearchGame.css';

// Подключение к игре через поиск
const SearchGame: FC = () => {

  const [gamesList, setGamesList] = useState<ExistingGamesType[] | []>([]);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout> | null>(
    null
  );
  const [inputValue, setInputValue] = useState<string>('');
  const [inputValidity, setInputValidity] = useState<boolean>(true);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [foundResults, setFoundResults] = useState<number>(0);

  const navigate = useNavigate();

  const { startFastGame } = useActions();

  // Первоначальный запрос списка игр (мультиплеер)
  // Пример для прототипа
  useEffect(() => {
    // Сервер отдаёт первые 12 результатов
    setGamesList(existingGames);
    // Ответ от сервера с количеством найденных результатов
    setFoundResults(existingGames.length + additionalGamesList.length);
  }, []);

  const buttonTitle = isProcessing ? 'Загружаем...' : 'Показать ещё';

  const searchClass = classNames('search-game__search', {
    'search-game__search_invalid': !inputValidity,
  });

  // Загрузка дополнительных результатов поиска
  const handleShowMore = () => {
    if (isProcessing) return;

    setIsProcessing(true);
    const additionalGames = additionalGamesList.slice(
      currentStep,
      currentStep + 12
    );
    setCurrentStep(currentStep + 12);
    setTimeout(() => {
      setGamesList([...gamesList, ...additionalGames]);
      setIsProcessing(false);
    }, 3500);
  };

  // Обработчик поля ввода
  const handleInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;
    setInputValue(value);
    checkInputValidity(evt);

    if (value === '') {
      // Если пользователь сбрасывает поиск, возвращаем начальный список
      setGamesList(existingGames);
      return;
    }

    if (value.length < 3 || value.length > 30) return;

    // Добавление таймера на
    timer && clearTimeout(timer);

    // Поиск игр после ввода с задержкой
    const timeout = setTimeout(() => {
      // запрос за данными
      console.log(value);
    }, 1500);

    setTimer(timeout);
  };

  // Валидация
  const checkInputValidity = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = evt;
    const { value } = target;

    if (value === '') {
      setInputValidity(true);
      return;
    }

    setInputValidity(gameNamePattern.test(value));
  };

  // Обработчик выбора игры (Прототип)
  const handleGameSelect = (id: number) => {
    startFastGame();
    console.log(id);
    navigate('../assembling');
  };

  return (
    <div className="search-game">
      <h1 className="search-game__title">Твои друзья уже здесь</h1>
      <div className="search-game__container">
        <Link to="/game" className="search-game__return-link" />
        <div className="search-game__content">
          <input
            className={searchClass}
            type="text"
            name="game-search"
            placeholder="Поиск"
            onChange={handleInput}
            value={inputValue}
            required
          />
          <ul className="search-game__table">
            {gamesList.map(game => (
              <FoundGame
                game={game}
                onSelect={handleGameSelect}
                key={game.id}
              />
            ))}
          </ul>
          {gamesList.length < foundResults && (
            <button
              className="search-game__show-more"
              onClick={handleShowMore}
              type="button"
              disabled={isProcessing}>
              {buttonTitle}
            </button>
          )}
        </div>
      </div>
      <Navigation />
    </div>
  );
};

export default memo(SearchGame);
