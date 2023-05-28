import { FC, memo } from 'react';
import './NotFoundGame.css';

const NotFoundGame: FC = () => {
  return (
    <div className='not-found-game'>
      <p className="not-found-game__message">Игры не найдены! Как хорошо, что вы можете создать свою игру и позвать своих друзей!</p>
    </div>
  );
};

export default memo(NotFoundGame);

