import classNames from 'classnames';
import { SortFunction } from '../types';
import './SortVariant.css';
import { FC, memo } from 'react';

type Props = {
  isSelected: boolean;
  description: string;
  sortFunction: SortFunction;
};

const SortMenuVariant: FC<Props> = ({
  isSelected,
  description,
  sortFunction,
}) => {
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
};

export default memo(SortMenuVariant);
