import { FC, memo, useCallback, useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import { useActions } from '@/hooks/useActions';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import ColorButton from './ColorButton/ColorButton';
import {
  useJoinGameMutation,
  useLeaveGameMutation,
} from '@/store/game/game.api';
import { selectGame } from '@/store/game/game.slice';
import { GameSocketContext } from '@/utils/socket/gameSocket';
import { SuitColorsType, suitsColors } from '../../../../utils/gameParams';
import './CharacterSelection.css';

// Экран выбора цвета скафандра (нужна игру уже найдена)
const CharacterSelection: FC = () => {
  const gameId = useTypedSelector(selectGame);

  // Блокирует возможность выбора цвета, если он уже выбран другим игроком
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
  const [userColor, setUserColor] = useState<keyof SuitColorsType | null>(null);

  // Запросы
  const [leaveGame] = useLeaveGameMutation();
  const [joinGame] = useJoinGameMutation();

  const socket = useContext(GameSocketContext);

  const { setGameStatus, cancelGame, setCurrentPlayer } = useActions();

  useEffect(() => {
    socket.on('selectedColors', handleSelectedColors);

    if (gameId) {
      socket.emit('joinGame', gameId);
      socket.emit('getSelectedColors', gameId, (colors: SuitColorsType) => {
        setUsedColors(colors);
      });
    }
    return () => {
      socket.off('selectedColors', handleSelectedColors);
    };
  }, [socket]);

  // Смена цвета в зависимости от выбора игрока
  const crewmanClass = classNames('character-selection__crewman', {
    [`character-selection__crewman_suit_${userColor}`]: true,
  });

  const handleSelectedColors = useCallback(
    (newColor: keyof SuitColorsType, oldColor: keyof SuitColorsType | null) => {
      if (oldColor) {
        setUsedColors(colors => ({
          ...colors,
          [newColor]: true,
          [oldColor]: false,
        }));
      } else {
        setUsedColors(colors => ({
          ...colors,
          [newColor]: true,
        }));
      }
    },
    []
  );

  // Выбор цвета
  const handleColorPick = useCallback(
    (color: keyof SuitColorsType) => {
      socket.emit('selectColor', gameId, color, userColor, newColor => {
        setUserColor(newColor);
      });
    },
    [userColor]
  );

  // Начало игры с выбранным цветом скафандра
  const handleStartGame = async () => {
    if (!userColor) return;
    if (!gameId) return;
    const playerData = await joinGame({
      gameId,
      color: userColor,
    });

    if ('error' in playerData) return;

    const playerId = playerData.data.player.id;

    if (playerId) {
      socket.emit('setSocketPlayer', gameId, playerId);
    }

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
      if (userColor) {
        socket.emit('unselectColor', gameId, userColor);
      }
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
                selected={userColor === color}
                disabled={
                  color === userColor
                    ? false
                    : usedColors
                    ? usedColors[color]
                    : false
                }
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
