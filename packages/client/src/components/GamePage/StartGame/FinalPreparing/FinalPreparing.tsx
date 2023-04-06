import { FC, memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import ColorButton from './ColorButton/ColorButton';
import { SuitColorsType, suitsColors } from '../../../../utils/gameParams';
import './FinalPreparing.css';

type Props = {
  onCancel: () => void;
};

// Экран выбора цвета скафандра (нужна игру уже найдена)
const FinalPreparing: FC<Props> = props => {
  const { onCancel } = props;

  const [selectedColor, setSelectedColor] = useState<string>('');

  // Для мультиплеера. Блокирует возможность выбора цвета, если он уже выбран другим игроком
  const [usedColors, setUsedColors] = useState<SuitColorsType>({
    white: false,
    red: false,
    green: true,
    blue: false,
    yellow: false,
    purple: false,
    aquamarine: false,
    brown: false,
    grey: false,
  });

  const navigate = useNavigate();

  // Исключительно для демонстрации
  setTimeout(() => setUsedColors(colors => ({ ...colors, white: true })), 5000);

  // TODO: Добавить смену цвета
  const crewmanClass = classNames('finalpreparing__crewman', {
    [`finalpreparing__crewman_suit_${selectedColor}`]: false, //selectedColor !== '',
  });

  // Предпосылки для мультиплеера
  // Устанавливаем выбранный цвет только по итогу ответа сервера
  const handleColorPick = (color: keyof SuitColorsType) => {
    setSelectedColor(color);
  };

  // Выход из игры // Прототип
  const handleExitGame = () => {
    // отмена игры;
    onCancel();
    navigate('..');
  };

  // Начало игры с выбранным цветом скафандра
  const handleStartGame = () => {
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
                selected={selectedColor === color}
                disabled={usedColors[color as keyof SuitColorsType]}
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
