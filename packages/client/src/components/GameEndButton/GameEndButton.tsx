import { Link } from "react-router-dom";
import './GameEndButton.css';

export default function GameEndButton(props:any) {
  return(
    <div className="game-end__button">
      <button type='button' style={{ backgroundColor: `${props.color}`}} className="game-end__button-name">
        <Link to={props.link} className='game-end__button-link'>{props.name}</Link>
      </button>
    </div>
  );
}
