import { FC, memo, useContext, useEffect } from 'react';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useActions } from '@/hooks/useActions';
import { selectGame, selectPlayer, selectPlayersAmount } from '@/store/game/game.slice';
import { useLeaveGameMutation } from '@/store/game/game.api';
import { getPluralSeconds } from '@/utils/helpers/getPlural';
import { MAX_PLAYERS } from '@/utils/gameParams';
import { GameSocketContext } from '@/utils/socket/gameSocket';
import type { IPlayer } from '@/store/game/game.types';
import './StartAwaiting.css';

// Экран ожидания начала игры
const AwaitStart: FC = () => {
  const { params } = useTypedSelector(state => state.game);
  const { color } = useTypedSelector(selectPlayer);

  // Состояние
  const gameId = useTypedSelector(selectGame);
  const playersAmount = useTypedSelector(selectPlayersAmount);

  // Запросы
  const [leaveGame] = useLeaveGameMutation();

  const {
    addPlayerToList,
    setPlayersAmount,
    removePlayerFromList,
    setGamePlayers,
    launchGame,
    cancelGame,
  } = useActions();
  const socket = useContext(GameSocketContext);

  useEffect(() => {
    socket.on('onPlayerJoin', addPlayerToList);
    socket.on('onLeaveGame', removePlayerFromList);
    socket.on('onGameReady', handleGameReady);

    if (gameId) {
      socket.emit('getPlayersAmount', gameId, (playersAmount) => {
        setPlayersAmount(playersAmount);
      });
    }

    return () => {
      socket.off('onPlayerJoin', addPlayerToList);
      socket.off('onLeaveGame', removePlayerFromList);
      socket.off('onGameReady', handleGameReady);
    };
  }, [socket]);

  // Обратный отсчёт
  useEffect(() => {
    if (playersAmount === MAX_PLAYERS) {
      setTimeout(() => {
        launchGame();
      }, 3000);
    }
  }, [playersAmount]);

  const heading = playersAmount !== MAX_PLAYERS ? 'Ожидаем игроков' : 'Запускаем!';

  // Обработчик готовности игры
  const handleGameReady = (players: IPlayer[]) => {
    setGamePlayers(players);
    launchGame();
  };

  // Выход из игры
  const handleExitGame = async () => {
    // отмена игры
    if (gameId) {
      await leaveGame({
        gameId,
      });
      socket.emit('unselectColor', gameId, color);
      socket.emit('leaveGame', gameId);
    }
    cancelGame();
  };

  return (
    <div className="start-awaiting">
      <div className="start-awaiting__timer">
        <h1 className="start-awaiting__title">{heading}</h1>
        <span className="start-awaiting__time-left">
          {`${playersAmount} / ${MAX_PLAYERS}`}
        </span>
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
