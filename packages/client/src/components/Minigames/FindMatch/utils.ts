import cardBack from '../../../images/form/eye-hide.svg';
import { cards } from './constants';
import { CardType } from './types';

export const shuffleCards = (arr: any[]): any[] => {
  return arr
    .map(a => [Math.random(), a])
    .sort((a, b) => a[0] - b[0])
    .map(a => a[1]);
};

export const createBoard = (): CardType[] =>
  [...cards, ...cards].map((card, i) => ({
    id: `card${i}`,
    flipped: false,
    backImage: cardBack,
    frontImage: card,
    clickable: true,
    matchingId:
      i < cards.length ? `card${i + cards.length}` : `card${i - cards.length}`,
  }));
