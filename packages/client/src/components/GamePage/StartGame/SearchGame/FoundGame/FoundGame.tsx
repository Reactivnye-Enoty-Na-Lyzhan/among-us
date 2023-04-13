import { FC, memo } from 'react';
import { ExistingGamesType } from '../../../../../utils/tempConstants';
import './FoundGame.css';

type Props = {
  game: ExistingGamesType;
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
        src={game.avatar}
        alt={`Аватар игрока ${game.nickname}.`}
      />
      <div className="found-game__game-info">
        <h2 className="found-game__title">{game.nickname}</h2>
        <p className="found-game__game-params">
          <span className="found-game__accent">Предателей: </span>
          {game.impostors}
        </p>
        <p className="found-game__game-params">
          <span className="found-game__accent">Игроков: </span>
          {game.players} / 9
        </p>
      </div>
    </li>
  );
};

export default memo(FoundGame);
