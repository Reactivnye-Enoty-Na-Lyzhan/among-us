import classNames from 'classnames';
import { SortFunction } from '../types';
import './SortVariant.css';

type Props = {
  isSelected: boolean;
  description: string;
  sortFunction: SortFunction;
};

export function SortMenuVariant({
  isSelected,
  description,
  sortFunction,
}: Props) {
  return (
    <li className="leaderboard__dropdown-item">
      <button
        className={classNames('leaderboard__sort-variant', {
          'leaderboard__sort-variant_active': isSelected,
        })}
        type="button"
        onClick={sortFunction}>
        {description}
      </button>
    </li>
  );
}
