import { useNavigate } from "react-router-dom";
import './GameEndButton.css';

interface Props {
  color: string;
  link: string;
  name: string;
}

export default function GameEndButton(props: Props) {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(props.link);
  };
  
  return(
      <button 
        type='submit' 
        onClick={handleClick} 
        className={`game-end__button-name game-end__button-name_${props.color} game-end__button-name_spacing_below`}>
        {props.name}
      </button>
  );
}
