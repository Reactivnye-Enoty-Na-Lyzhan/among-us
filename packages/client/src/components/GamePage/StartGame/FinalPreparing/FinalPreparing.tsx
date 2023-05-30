import { FC, memo, useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { useActions } from '@/hooks/useActions';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import ColorButton from './ColorButton/ColorButton';
import { GameSocketContext } from '@/utils/socket/gameSocket';
import { SuitColorsType, suitsColors } from '../../../../utils/gameParams';
import './FinalPreparing.css';

// Экран выбора цвета скафандра (нужна игру уже найдена)
const FinalPreparing: FC = () => {
  const { color: userSuitColor, id: playerId } = useTypedSelector(
    state => state.game.player
  );

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

  const navigate = useNavigate();

  const socket = useContext(GameSocketContext);

  const { cancelGame, setPlayerId, selectColor } = useActions();

  useEffect(() => {
    socket.on('selectedColors', setUsedColors);
    socket.emit('joinGame', newPlayerId => {
      setPlayerId(newPlayerId);
    });

    return () => {
      socket.off('selectedColors', setUsedColors);
    };
  }, [socket]);

  // TODO: Добавить смену цвета
  const crewmanClass = classNames('finalpreparing__crewman', {
    [`finalpreparing__crewman_suit_${userSuitColor}`]: false, //selectedColor !== '',
  });

  // Предпосылки для мультиплеера
  // TODO: Устанавливаем выбранный цвет только по итогу ответа сервера
  const handleColorPick = useCallback(
    (color: keyof SuitColorsType) => {
      socket.emit('colorSelect', color, userSuitColor, newColor => {
        selectColor(newColor);
        socket.emit('playerReady', playerId);
      });
    },
    [userSuitColor, playerId]
  );

  // Выход из игры
  // TODO: Выход из игры в режиме мультиплеера
  const handleExitGame = () => {
    // отмена игры;
    cancelGame();
    navigate('..');
  };

  // Начало игры с выбранным цветом скафандра
  const handleStartGame = () => {
    if (!userSuitColor) return;

    navigate('../await');
  };

  return (
    <div className="finalpreparing finalpreparing_spacing_outer">
      <h1 className="finalpreparing__title">
        Какой цвет скафандра у тебя будет?
      </h1>
      <div className="finalpreparing__container">
        <div className={crewmanClass}></div>
        <ul className="finalpreparing__colors-list">
          {suitsColors.map(color => (
            <li className="finalpreparing__list-item" key={color}>
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
          className="finalpreparing__navigation"
          type="button"
          onClick={handleStartGame}>
          <span className="finalpreparing__button-title">Играть</span>
          <span className="finalpreparing__button-icon"></span>
        </button>
      </div>
      <button
        className="finalpreparing__leave-game"
        type="button"
        onClick={handleExitGame}>
        Выйти из игры
      </button>
    </div>
  );
};

export default memo(FinalPreparing);
