import GameEnd from '../GameEnd/GameEnd';
import './GamePage.css';

export default function GamePage() {
  const result = 'win';
  const score = 100;
  return (
    <div className='game'>
      <GameEnd result={result} score={score}/>
    </div>
  );
}
