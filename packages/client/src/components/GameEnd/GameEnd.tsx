import { Link } from 'react-router-dom';
import { FC, useCallback } from 'react';
import { useActions } from '@/hooks/useActions';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import GameEndButton from '../GameEndButton/GameEndButton';
import './GameEnd.css';

type Config = {
  imageLeftSrc: (score: number) => string;
  imageRightSrc: (score: number) => string;
};

const config: Record<string, Config> = {
  lose: {
    imageLeftSrc: () => ' ',
    imageRightSrc: () => 'game-end__image_impostor_dead',
  },
  win: {
    imageLeftSrc: (score: number) =>
      score > 10
        ? 'game-end__image_impostor_red'
        : 'game-end__image_impostor_yellow',
    imageRightSrc: (score: number) =>
      score > 10
        ? 'game-end__image_impostor_firework'
        : 'game-end__image_impostor_mint',
  },
};

const GameEnd: FC = () => {
  const { result, score } = useTypedSelector(state => state.game.results);

  const { playMore } = useActions();

  const { imageLeftSrc, imageRightSrc } = config[result];

  const handleGameStart = useCallback(() => {
    playMore();
  }, []);

  return (
    <div className="game-end game-end_spacing_below">
      <div
        className={`game-end__image ${imageLeftSrc(
          score
        )} game-end__image_left`}></div>
      <div className="game-end__wrapper">
        <h1 className="game-end__title game-end__title_spacing_above-below">
          {result === 'lose' ? 'Как же так-то?' : 'Победа!'}
        </h1>
        <div className="game-end__container">
          <GameEndButton
            name="Сыграть ещё"
            link="/games"
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
      <div
        className={`game-end__image ${imageRightSrc(
          score
        )} game-end__image_right`}></div>
    </div>
  );
};

export default GameEnd;
