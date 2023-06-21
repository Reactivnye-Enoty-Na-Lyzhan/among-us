import { FC, memo, useContext, useEffect } from 'react';
import classNames from 'classnames';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useActions } from '@/hooks/useActions';
import {
  selectGame,
  selectPlayer,
  selectPlayers,
  selectPlayersAmount,
} from '@/store/game/game.slice';
import { useLeaveGameMutation } from '@/store/game/game.api';
import { getPluralSeconds } from '@/utils/helpers/getPlural';
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
  const players = useTypedSelector(selectPlayers);

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
      // Получаем количество присоединившихся игроков
      socket.emit('getPlayersAmount', gameId, playersAmount => {
        setPlayersAmount(playersAmount);
      });

      // Сообщаем о своей готовности
      socket.emit('setPlayerReady', gameId);
    }

    return () => {
      socket.off('onPlayerJoin', addPlayerToList);
      socket.off('onLeaveGame', removePlayerFromList);
      socket.off('onGameReady', handleGameReady);
    };
  }, [socket]);

  useEffect(() => {
    if (players && players.length >= params.players) {
      launchGame();
    }
  }, [players]);

  const heading =
    playersAmount !== params.players ? 'Ожидаем игроков' : 'Готовы к запуску!';

  const crewmanClassname = classNames('start-awaiting__crewman', {
    [`start-awaiting__crewman_suit_${color}`]: true,
  });

  // Обработчик готовности игры
  const handleGameReady = (players: IPlayer[]) => {
    console.log('Игроки из Awaiting', players);
    setGamePlayers(players);

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
          {`${playersAmount} / ${params.players}`}
        </span>
      </div>
      <div className="start-awaiting__content">
        <ul className="start-awaiting__settings-list">
          <li className="start-awaiting__list-item">
            <h2 className="start-awaiting__param-name">Экстренных собраний:</h2>
            <span className="start-awaiting__param-value">
              {params.meetings}
            </span>
          </li>
          <li className="start-awaiting__list-item">
            <h2 className="start-awaiting__param-name">Время на обсуждение:</h2>
            <span className="start-awaiting__param-value">
              {params.discussion} {getPluralSeconds(params.discussion)}
            </span>
          </li>
          <li className="start-awaiting__list-item">
            <h2 className="start-awaiting__param-name">
              Перерыв между собраниями:
            </h2>
            <span className="start-awaiting__param-value">
              {params.interval} {getPluralSeconds(params.interval)}
            </span>
          </li>
        </ul>
        <div className={crewmanClassname}></div>
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
