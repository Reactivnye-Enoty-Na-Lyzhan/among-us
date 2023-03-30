import { Link } from "react-router-dom";
import GameEndButton from '../GameEndButton/GameEndButton';
import './GameEnd.css';

type Props = {
  result: string;
  score: number;
};

export default function GameEnd({result, score}: Props){
  
  let imageLeftSrc = '';
  if (result === 'lose') {
    imageLeftSrc = ' ';
  } else if (result === 'win' && score > 10) {
    imageLeftSrc = 'game-end__image_impostor_red';
  } else {
    imageLeftSrc = 'game-end__image_impostor_yellow';
  }

  let imageRightSrc = '';
  if (result === 'lose') {
    imageRightSrc = 'game-end__image_impostor_dead';
  } else if (result === 'win' && score > 10) {
    imageRightSrc = 'game-end__image_impostor_firework';
  } else {
    imageRightSrc = 'game-end__image_impostor_mint';
  }

  return(
    <div className="game-end game-end_spacing_below">
      <div className={`game-end__image ${imageLeftSrc} game-end__image_left`}></div>
      <div className='game-end__wrapper'>
      <h1 className='game-end__title game-end__title_spacing_above-below'>{result === 'lose' ? 'Как же так-то?' : 'Победа!'}</h1>
        <div className='game-end__container'>
          <GameEndButton name='Сыграть ещё' link='/game' color='green'/>
          <GameEndButton name='Рейтинг' link='/leaderboard' color='violet'/>
          <GameEndButton name='Ваш профиль' link='/profile' color='pink'/>
          <p className='game-end__text game-end__text_spacing_below'>или</p>
          <Link  className='game-end__link' to='/forum'>Посетите наш форум</Link>
        </div>
      </div>
        <div className={`game-end__image ${imageRightSrc} game-end__image_right`}></div>
    </div>
  );
}
