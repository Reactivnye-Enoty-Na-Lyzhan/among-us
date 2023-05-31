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
      <img
        className={`card__frontImg ${card.flipped ? 'flipped' : ''}`}
        src={card.frontImage}
        alt="card front"
      />
      <img
        className={`card__backImg ${card.flipped ? 'flipped' : ''}`}
        src={card.backImage}
        alt="card back"
      />
    </div>
  );
};
export default Card;
