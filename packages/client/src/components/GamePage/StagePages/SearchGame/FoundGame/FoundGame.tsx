import { FC, memo } from 'react';
import { IFoundGame } from '@/store/game/game.types';
import { DEFAULT_RESOURCE_URL } from '@/utils/constants';
import './FoundGame.css';

type Props = {
  game: IFoundGame;
  onSelect: (id: number) => void;
};

// Экран поиска игры
const FoundGame: FC<Props> = props => {
  const { game, onSelect } = props;

  // Обработчик выбора игры
  const handleGameSelect = () => {
    onSelect(game.id);
  };

  return (
    <li className="found-game" onClick={handleGameSelect}>
      <img
        className="found-game__user-avatar"
        src={`${DEFAULT_RESOURCE_URL}/${game.creator.avatar}`}
        alt={`Аватар игрока ${game.creator.login}.`}
      />
      <div className="found-game__game-info">
        <h2 className="found-game__title">{game.title}</h2>
        <p className="found-game__game-params">
          <span className="found-game__accent">Собраний: </span>
          {game.param.meetings}
        </p>
        <p className="found-game__game-params">
          <span className="found-game__accent">Игроков: </span>
          {game.players} / {game.param.players}
        </p>
      </div>
    </li>
  );
};

export default memo(FoundGame);
