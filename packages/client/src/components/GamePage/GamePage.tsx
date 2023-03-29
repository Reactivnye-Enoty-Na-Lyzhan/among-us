import GameEnd from '../GameEnd/GameEnd';
import './GamePage.css';

export default function GamePage() {
  const result= '';
  return (
    <div className='game'>
      <GameEnd result={result}/>
    </div>
  );
}
