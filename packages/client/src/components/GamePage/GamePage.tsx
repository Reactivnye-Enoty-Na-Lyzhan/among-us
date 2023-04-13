import GameEnd from '../GameEnd/GameEnd';
import './GamePage.css';

interface Props {
  result: "lose" | "win";
  score: number;
}

export default function GamePage({result, score}: Props) {
  return (
    <div className='game'>
      <GameEnd result={result} score={score}/>
    </div>
  );
}

