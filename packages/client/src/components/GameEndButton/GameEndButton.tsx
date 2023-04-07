import { Link } from "react-router-dom";
import './GameEndButton.css';

interface Props {
  color: string;
  link: string;
  name: string;
}

export default function GameEndButton(props: Props) {
  
  return(
      <Link to={props.link} className={`game-end__button-name game-end__button-name_${props.color} game-end__button-name_spacing_below`}>
        {props.name}
      </Link>
  
  );
}
