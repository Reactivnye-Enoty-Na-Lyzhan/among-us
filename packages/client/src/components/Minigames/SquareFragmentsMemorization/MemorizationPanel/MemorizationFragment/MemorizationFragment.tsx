import classNames from 'classnames';
import { useState, type FC, useEffect } from 'react';
import { MemorizationPanelContext } from '../types';
import { MEMORIZATION_FRAGMENT_HIGHLIGHTING_DURATION } from '../constants';
import './MemorizationFragment.css';

type Props = {
  fragmentIndex: number;
  memorizationPanelContext: MemorizationPanelContext;
};

export const MemorizationFragment: FC<Props> = ({
  memorizationPanelContext,
  fragmentIndex,
}) => {
  const [isHighlighted, setIsHighLighted] = useState(false);

  useEffect(() => {
    const toggleFragmentHighlighting = () => {
      setIsHighLighted(currentValue => {
        console.log(
          `TOGGLE FRAGMENT-${fragmentIndex} HIGHLIGHT : ${currentValue}->${!currentValue}`
        );

        return !currentValue;
      });
    };

    memorizationPanelContext.toggleFragmentHighlighting[fragmentIndex] =
      toggleFragmentHighlighting;
  }, []);

  return (
    <div
      className={classNames(
        'square-fragments-memorization-game__memorization-fragment',
        {
          'square-fragments-memorization-game__memorization-fragment_highlighted':
            isHighlighted,
        }
      )}
      style={{
        transition: `${MEMORIZATION_FRAGMENT_HIGHLIGHTING_DURATION}ms`,
      }}></div>
  );
};
