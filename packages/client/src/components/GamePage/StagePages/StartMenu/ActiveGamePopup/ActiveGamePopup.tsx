import { FC, memo, useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import { useGetCurrentGameQuery } from '@/store/game/game.api';
import { useActions } from '@/hooks/useActions';
import { GameSocketContext } from '@/utils/socket/gameSocket';
import './ActiveGamePopup.css';

const ActiveGamePopup: FC = () => {
  const [hasActiveGame, setHasActiveGame] = useState<boolean>(false);

  const { data } = useGetCurrentGameQuery();

  const socket = useContext(GameSocketContext);

  const { setGame, setCurrentPlayer, setGamePlayers, launchGame } =
    useActions();

  useEffect(() => {
    if (data?.game?.id) {
      setHasActiveGame(true);
    }
  }, [data]);

  const popupClassname = classNames('active-game-popup', {
    'active-game-popup_opened': hasActiveGame,
  });

  const handleContinueGame = () => {
    if (!data) return;

    const { game, currentPlayerId } = data;

    const currentPlayerData = game.players.find(
      player => player.id === currentPlayerId
    );

    if (!currentPlayerData) return;

    socket.emit('joinGame', game.id);
    socket.emit('returnToGame', game.id, currentPlayerId, coordinates => {
      console.log('пришедшие координаты', coordinates);
    });

    setGame(game);
    setCurrentPlayer(currentPlayerData);
    setGamePlayers(game.players);
    launchGame();
  };

  const handleExitGame = () => {
    if (!data) return;

    socket.emit('killPlayer', data.game.id, data.currentPlayerId, true);
    setHasActiveGame(false);
  };

  return (
    <div className={popupClassname}>
      <div className="active-game-popup__container">
        <span className="active-game-popup__crewman" />
        <h3 className="active-game-popup__title">У тебя есть активная игра!</h3>
        <p className="active-game-popup__subtitle">Выбор за тобой</p>
        <div className="active-game-popup__button-container">
          <button
            className="active-game-popup__action-btn"
            onClick={handleContinueGame}
            type="button">
            Вернуться в игру
          </button>
          <button
            className="active-game-popup__action-btn active-game-popup__action-btn_target_exit"
            onClick={handleExitGame}
            type="button">
            Найти новую
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(ActiveGamePopup);
