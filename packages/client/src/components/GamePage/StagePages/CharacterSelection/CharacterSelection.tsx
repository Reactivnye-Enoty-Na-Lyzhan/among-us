import { FC, memo, useCallback, useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import { useActions } from '@/hooks/useActions';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import ColorButton from './ColorButton/ColorButton';
import { useJoinGameMutation, useLeaveGameMutation } from '@/store/game/game.api';
import { selectGame } from '@/store/game/game.slice';
import { GameSocketContext } from '@/utils/socket/gameSocket';
import { SuitColorsType, suitsColors } from '../../../../utils/gameParams';
import './CharacterSelection.css';

// Экран выбора цвета скафандра (нужна игру уже найдена)
const CharacterSelection: FC = () => {
  const { color: userSuitColor, id: playerId } = useTypedSelector(state => state.game.player);
  const gameId = useTypedSelector(selectGame);

  // Для мультиплеера. Блокирует возможность выбора цвета, если он уже выбран другим игроком
  const [usedColors, setUsedColors] = useState<SuitColorsType>({
    white: false,
    red: false,
    green: false,
    blue: false,
    yellow: false,
    purple: false,
    aquamarine: false,
    brown: false,
    grey: false,
  });

  // Запросы
  const [leaveGame] = useLeaveGameMutation();

  const socket = useContext(GameSocketContext);

  const {
    setGameStatus,
    cancelGame,
    setPlayerId,
    selectColor,
    setCurrentPlayer,
  } = useActions();

  const [joinGameResponse] = useJoinGameMutation();

  useEffect(() => {
    socket.on('selectedColors', setUsedColors);
    socket.emit('joinGame', (newPlayerId) => {
      setPlayerId(Number(newPlayerId));
    });

    return () => {
      socket.off('selectedColors', setUsedColors);
    };
  }, [socket]);

  // TODO: Добавить смену цвета
  const crewmanClass = classNames('character-selection__crewman', {
    [`character-selection__crewman_suit_${userSuitColor}`]: false, //selectedColor !== '',
  });

  // Предпосылки для мультиплеера
  // TODO: Устанавливаем выбранный цвет только по итогу ответа сервера
  const handleColorPick = useCallback((color: keyof SuitColorsType) => {
    socket.emit('colorSelect', color, userSuitColor, (newColor) => {
      selectColor(newColor);
      socket.emit('playerReady', 'playerId');
    });

  }, [userSuitColor, playerId]);

  // Начало игры с выбранным цветом скафандра
  const handleStartGame = async () => {
    if (!userSuitColor) return;
    if (!gameId) return;
    const playerData = await joinGameResponse({
      gameId,
      color: userSuitColor,
    });

    if ('error' in playerData) return;

    setCurrentPlayer(playerData.data.player);
    setGameStatus('startAwaiting');
  };

  // Выход из игры
  const handleExitGame = async () => {
    // отмена игры;
    if (gameId) {
      await leaveGame({
        gameId,
      });
    }
    cancelGame();
  };

  return (
    <div className="character-selection character-selection_spacing_outer">
      <h1 className="character-selection__title">
        Какой цвет скафандра у тебя будет?
      </h1>
      <div className="character-selection__container">
        <div className={crewmanClass}></div>
        <ul className="character-selection__colors-list">
          {suitsColors.map(color => (
            <li className="character-selection__list-item" key={color}>
              <ColorButton
                color={color}
                selected={userSuitColor === color}
                disabled={usedColors[color]}
                onSelect={handleColorPick}
              />
            </li>
          ))}
        </ul>
        <button
          className="character-selection__navigation"
          type="button"
          onClick={handleStartGame}>
          <span className="character-selection__button-title">Играть</span>
          <span className="character-selection__button-icon"></span>
        </button>
      </div>
      <button
        className="character-selection__leave-game"
        type="button"
        onClick={handleExitGame}>
        Выйти из игры
      </button>
    </div>
  );
};

export default memo(CharacterSelection);
