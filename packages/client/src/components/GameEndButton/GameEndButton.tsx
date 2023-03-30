import { Link } from "react-router-dom";
import './GameEndButton.css';

interface Props {
  color: string;
  link: string;
  name: string;
}

export default function GameEndButton(props: Props) {
  return(
    <div className="game-end__button">
      <button type='button' style={{ backgroundColor: `${props.color}`}} className="game-end__button-name game-end__button-name_spacing_below">
        <Link to={props.link} className='game-end__button-link'>{props.name}</Link>
      </button>
    </div>
  );
}
