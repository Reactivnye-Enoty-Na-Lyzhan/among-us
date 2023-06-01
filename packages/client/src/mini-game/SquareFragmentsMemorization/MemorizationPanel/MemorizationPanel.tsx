import { FC, useContext, useMemo } from 'react';
import ProgressBar, {
  ProgressbarIndicatorStatus,
} from '../ProgressBar/ProgressBar';
import { useFragmentsHighlighting } from './useFragmentsHighlighting';
import { GameContext } from '../GameContext/context';
import { MemorizationFragment } from './MemorizationFragment/MemorizationFragment';
import { MemorizationPanelContext } from './types';
import './MemorizationPanel.css';

const MemorizationPanel: FC = () => {
  const { memorizationSequenceRef } = useContext(GameContext);
  const memorizationSequence = memorizationSequenceRef.current;

  const memorizationPanelContext: MemorizationPanelContext = useMemo(
    () => ({
      toggleFragmentHighlighting: {},
    }),
    []
  );

  const memorizationFragmentsGrid = useMemo(
    () =>
      Array.from({ length: 9 }).map((_, index) => (
        <MemorizationFragment
          key={index}
          fragmentIndex={index}
          memorizationPanelContext={memorizationPanelContext}
        />
      )),
    []
  );

  const indicatorsStatuses = Array(memorizationSequence.length).fill(
    ProgressbarIndicatorStatus.SUCCESS
  );

  useFragmentsHighlighting({
    memorizationPanelContext,
  });

  return (
    <div className="square-fragments-memorization-game__puzzle-panel">
      <ProgressBar indicatorsStatuses={indicatorsStatuses} />
      <div className="square-fragments-memorization-game__memorization-panel">
        {memorizationFragmentsGrid}
      </div>
    </div>
  );
};

export default MemorizationPanel;
