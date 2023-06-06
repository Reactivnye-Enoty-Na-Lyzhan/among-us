import classNames from 'classnames';
import { FC, memo } from 'react';
import type { OnSelectHandler } from './types';
import './SortingVariant.css';

type Props = {
  description: string;
  isSelected: boolean;
  onSelectHandler: OnSelectHandler;
};

const SortMenuVariant: FC<Props> = ({
  isSelected,
  description,
  onSelectHandler,
}) => {
  return (
    <li className="leaderboard__dropdown-item">
      <button
        className={classNames('leaderboard__sort-variant', {
          'leaderboard__sort-variant_active': isSelected,
        })}
        type="button"
        onClick={onSelectHandler}>
        {description}
      </button>
    </li>
  );
};

export default memo(SortMenuVariant);
