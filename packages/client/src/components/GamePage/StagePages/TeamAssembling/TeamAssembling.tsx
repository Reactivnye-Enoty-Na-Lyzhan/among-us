import { memo, FC, useEffect, useState } from 'react';
import Navigation from '../Navigation/Navigation';
import { useActions } from '@/hooks/useActions';
import { GameIdType } from '@/store/game/game.types';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { selectGame } from '@/store/game/game.slice';
import {
  useFindHotGameQuery,
  useLeaveGameMutation,
  useTakeQueueMutation,
} from '@/store/game/game.api';
import './TeamAssembling.css';

// Экран подбора команды
const TeamAssembling: FC = () => {
  const [isSearching, setIsSearching] = useState<boolean>(true);
  const [counter, setCounter] = useState<number>(0);
  const [pollingInterval, setPollingInterval] = useState<number>(15000);

  // Состояние
  const gameId = useTypedSelector(selectGame);

  // Запросы
  const { data, isSuccess: findGameSuccess } = useFindHotGameQuery({}, { pollingInterval: pollingInterval });
  const [takeQueue] = useTakeQueueMutation();
  const [leaveGame] = useLeaveGameMutation();

  const { setGame, setGameStatus, cancelGame } = useActions();

  // Когда получим ID доступной игры - подключаемся к очереди
  useEffect(() => {
    console.log(data?.game, findGameSuccess);
    if (data?.game !== null && findGameSuccess) {
      setPollingInterval(0);

      takeGameQueue(data.game.id);
    }
  }, [data]);

  // Отсчёт. В дальнейшем будет связан со временем создания игры
  useEffect(() => {
    isSearching && setTimeout(() => setCounter(counter + 1), 1000);
  }, [counter, isSearching]);


  // Подключение к очереди в игру
  const takeGameQueue = async (gameId: GameIdType) => {
    try {
      const gameData = await takeQueue({
        gameId,
      });

      if ('error' in gameData) {
        throw new Error;
      }

      setGame(gameData.data);
      setGameStatus('characterSelection');
    } catch {
      setPollingInterval(15000);
    }
  };

  // Отмена поиска игры
  async function handleCancelSearch() {
    if (gameId) {
      await leaveGame({
        gameId,
      });
    }
    setIsSearching(false);
    cancelGame();
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
