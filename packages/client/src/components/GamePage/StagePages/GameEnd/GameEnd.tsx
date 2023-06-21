import { FC, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useActions } from '@/hooks/useActions';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { selectResults } from '@/store/game/game.slice';
import GameEndButton from './GameEndButton/GameEndButton';
import './GameEnd.css';

type Config = {
  imageLeftSrc: string;
  imageRightSrc: string;
};

const config: Record<string, Config> = {
  impostor: {
    imageLeftSrc: 'game-end__image_impostor_yellow',
    imageRightSrc: 'game-end__image_impostor_mint',
  },
  civil: {
    imageLeftSrc: 'game-end__image_impostor_red',
    imageRightSrc: 'game-end__image_impostor_firework',
  },
};

const GameEnd: FC = () => {
  const { winners } = useTypedSelector(selectResults);

  const { playMore } = useActions();

  const { imageLeftSrc, imageRightSrc } =
    winners === 'impostor' ? config['impostor'] : config['civil'];

  console.log('winners', winners, imageLeftSrc, imageRightSrc);
  const handleGameStart = useCallback(() => {
    playMore();
  }, []);

  return (
    <div className="game-end game-end_spacing_below">
      <div className={`game-end__image ${imageLeftSrc}`}></div>
      <div className="game-end__wrapper">
        <h1 className="game-end__title game-end__title_spacing_above-below">
          {winners === 'impostor' ? 'Как так получилось?' : 'Победа мирных!'}
        </h1>
        <div className="game-end__container">
          <GameEndButton
            name="Сыграть ещё"
            link="/game"
            color="green"
            onClick={handleGameStart}
          />
          <GameEndButton name="Рейтинг" link="/leaderboard" color="violet" />
          <GameEndButton name="Ваш профиль" link="/profile" color="pink" />
          <p className="game-end__text game-end__text_spacing_below">или</p>
          <Link className="game-end__link" to="/forum">
            Посетите наш форум
          </Link>
        </div>
      </div>
      <div className={`game-end__image ${imageRightSrc}`}></div>
    </div>
  );
};

export default GameEnd;
