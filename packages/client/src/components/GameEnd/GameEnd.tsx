import { Link } from "react-router-dom";
import impostorOne from '../../images/impostor-yellow.svg';
import impostorTwo from '../../images/impostor-mint.svg';
import impostorDead from '../../images/impostor-dead.svg';
import GameEndButton from '../GameEndButton/GameEndButton';
import './GameEnd.css';

type Props = {
  result: string;
};

export default function GameEnd({result}: Props){

  return(
    <div className="game-end">
      {result === 'lose' ? (
        <img src=' ' alt='name' className='game-end__image-left'/>
      ) : (
        <img src={impostorOne} alt='name' className='game-end__image_left'/>
      )}
      <div className='game-end__wrapper'>
      <h1 className='game-end__subtitle'>{result === 'lose' ? 'Как же так-то?' : 'Победа!'}</h1>
        <div className='game-end__container'>
          <GameEndButton name='Сыграть ещё' link='/game' color='#24D108'/>
          <GameEndButton name='Рейтинг' link='/leaderboard' color='#910CBF'/>
          <GameEndButton name='Ваш профиль' link='/profile' color='#E8125F'/>
          <p className='game-end__text'>или</p>
          <Link  className='game-end__link' to='/forum'>Посетите наш форум</Link>
        </div>
      </div>
      {result === 'lose' ? (
        <img src={impostorDead} alt='name' className='game-end__image_right'/>
      ) : (
        <img src={impostorTwo} alt='name' className='game-end__image_right'/>
      )}
    </div>
  );
}
