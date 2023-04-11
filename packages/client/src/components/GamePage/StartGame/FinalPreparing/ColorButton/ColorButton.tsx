import { FC, memo } from 'react';
import classNames from 'classnames';
import { SuitColorsType } from '../../../../../utils/gameParams';
import './ColorButton.css';

type Props = {
  color: keyof SuitColorsType,
  selected: boolean,
  disabled: boolean,
  onSelect: (color: keyof SuitColorsType) => void,
};

// Кнопка выбора цвета скафандра
const ColorButton: FC<Props> = props => {
  const { color, selected, disabled, onSelect } = props;

  const buttonClass = classNames('finalpreparing__color-button', {
    [`finalpreparing__color-button_color_${color}`]: true,
    'finalpreparing__color-button_selected': selected,
  });

  const handleClick = () => {
    onSelect(color);
  };

  return (
    <button className={buttonClass} onClick={handleClick} disabled={disabled} />
  );
};

export default memo(ColorButton);
