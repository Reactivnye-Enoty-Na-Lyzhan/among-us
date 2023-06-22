import { FC } from 'react';
import { CardType } from '../types';
import './Card.css';

type Props = {
  card: CardType;
  handleCardClick: (card: CardType) => void;
};

const Card: FC<Props> = ({ card, handleCardClick }) => {
  const handleClick = () => {
    if (card.clickable) handleCardClick(card);
  };

  return (
    <div className="card" onClick={handleClick}>
      <div
        className={`card__frontImg ${card.flipped ? 'flipped' : ''}`}
        style={{ backgroundImage: `url(${card.frontImage})` }}></div>
      <div
        className={`card__backImg ${card.flipped ? 'flipped' : ''}`}
        style={{ backgroundImage: `url(${card.backImage})` }}></div>
    </div>
  );
};
export default Card;
