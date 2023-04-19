import { FC, memo } from 'react';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useActions } from '@/hooks/useActions';
import './Game.css';

const Game: FC = () => {
  const { color } = useTypedSelector(state => state.game.player);
  const { finishGame } = useActions();

  const handleFinishGame = () => {
    finishGame({
      result: 'win',
      score: 350,
    });
  };

  return (
    <div className="game">
      <h1 className="game__title">Мы рады видеть вас! Вот вам игра:</h1>
      <p className="game__description">
        Игра ещё не добавлена, но скоро точно будет!
      </p>
      <p className="game__player-color">{`Кстати, а цвет игрока будет - ${color}`}</p>
      <button className="game__end-game" onClick={handleFinishGame}>
        Завершить игру
      </button>
    </div>
  );
};

export default memo(Game);
