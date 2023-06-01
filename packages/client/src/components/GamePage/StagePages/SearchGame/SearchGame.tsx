import { FC, memo, useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import Navigation from '../../StagePages/Navigation/Navigation';
import FoundGame from './FoundGame/FoundGame';
import NotFoundGame from './NotFoundGame/NotFoundGame';
import { useActions } from '@/hooks/useActions';
import { gameNamePattern } from '../../../../utils/gameParams';
import {
  useFindGameMutation,
  useGetGamesMutation,
  useTakeQueueMutation,
} from '@/store/game/game.api';
import type { IFoundGame } from '@/store/game/game.types';
import './SearchGame.css';

// Подключение к игре через поиск
const SearchGame: FC = () => {
  const [gamesList, setGamesList] = useState<IFoundGame[] | []>([]);
  const [searchResults, setSearchResults] = useState<IFoundGame[] | []>([]);
  const [isProcessing, setIsProcessing] = useState<boolean>(true);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout> | null>(
    null
  );
  const [inputValue, setInputValue] = useState<string>('');
  const [inputValidity, setInputValidity] = useState<boolean>(true);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [foundResults, setFoundResults] = useState<number>(0);

  // Запросы
  const [getGames] = useGetGamesMutation();
  const [takeQueue] = useTakeQueueMutation();
  const [findGame] = useFindGameMutation();

  // Обработчики
  const { setGameStatus, setGame, setLoadingStatus } = useActions();

  const navigate = useNavigate();

  // Первоначальный запрос списка игр
  useEffect(() => {
    setLoadingStatus(true);
    loadGamesList();
  }, []);

  const hasGames = gamesList.length > 0 || searchResults.length > 0;

  const buttonTitle = isProcessing ? 'Загружаем...' : 'Показать ещё';

  const searchClass = classNames('search-game__search', {
    'search-game__search_invalid': !inputValidity,
  });

  // Обработчик получения списка игр
  const loadGamesList = async () => {
    try {
      const games = await getGames({
        limit: 12,
        offset: currentStep,
      });

      if ('error' in games) return;

      const resultsLength = games.data.foundGames.length;

      setGamesList(gamesList => [...gamesList, ...games.data.foundGames]);
      setFoundResults(results =>
        resultsLength === 12 ? results + resultsLength : 0
      );
      setCurrentStep(step => (resultsLength === 12 ? step + 12 : step));
    } catch (err: unknown) {
      console.error(err);
    } finally {
      setIsProcessing(false);
      setLoadingStatus(false);
    }
  };

  // Загрузка дополнительных результатов поиска
  const handleShowMore = async () => {
    if (isProcessing) return;

    setIsProcessing(true);

    await loadGamesList();

    setIsProcessing(false);
  };

  // Обработчик поля ввода
  const handleInput = async (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;
    setInputValue(value);
    checkInputValidity(evt);

    if (value === '') {
      // Если пользователь сбрасывает поиск, возвращаем начальный список
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    if (value.length < 3 || value.length > 30) return;

    // Добавление таймера на
    timer && clearTimeout(timer);

    // Поиск игр после ввода с задержкой
    const timeout = setTimeout(async () => {
      // запрос за данными
      const foundGames = await findGame({
        title: value,
      });

      if ('error' in foundGames) return;

      setSearchResults(foundGames.data.games);
      setIsSearching(true);
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

  // Обработчик выбора игры
  const handleGameSelect = useCallback(async (id: number) => {
    const game = await takeQueue({
      gameId: id,
    });

    if ('error' in game) return;

    setGame(game.data);
    setGameStatus('characterSelection');
    navigate('..');
  }, []);

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
          {hasGames ? (
            <ul className="search-game__table">
              {(isSearching ? searchResults : gamesList).map(game => (
                <FoundGame
                  game={game}
                  onSelect={handleGameSelect}
                  key={game.id}
                />
              ))}
            </ul>
          ) : (
            <NotFoundGame />
          )}
          {!isSearching && gamesList.length < foundResults && (
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
