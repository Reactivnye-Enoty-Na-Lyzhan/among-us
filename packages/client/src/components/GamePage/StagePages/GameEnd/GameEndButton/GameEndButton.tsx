import { memo } from 'react';
import { Link } from 'react-router-dom';
import './GameEndButton.css';

interface Props {
  color: string;
  link: string;
  name: string;
  onClick?: () => void;
}

function GameEndButton(props: Props) {
  const { onClick } = props;

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <Link
      to={props.link}
      className={`game-end__button-name game-end__button-name_${props.color} game-end__button-name_spacing_below`}
      onClick={handleClick}>
      {props.name}
    </Link>
  );
}

export default memo(GameEndButton);
