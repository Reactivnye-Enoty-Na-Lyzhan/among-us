import { type FC, useMemo } from 'react';
import ProgressBar from '../ProgressBar/ProgressBar';
import PickingButton from './PickingButton/PickingButton';
import type { PickingPanelContext } from './types';
import {
  usePickStatus,
  usePickingBlock,
  usePickedSequenceResetting,
  useProgressbar,
} from './hooks';
import './PickingPanel.css';

const PickingPanel: FC = () => {
  const pickingPanelContext = useMemo(
    () =>
      ({
        resetPickButton: {},
      } as PickingPanelContext),
    []
  );

  usePickStatus({ pickingPanelContext });
  usePickingBlock({
    pickingPanelContext,
  });
  usePickedSequenceResetting({
    pickingPanelContext,
  });
  const { progressbarIndicators } = useProgressbar({ pickingPanelContext });

  const pickingButtons = useMemo(
    () =>
      Array.from({
        length: 9,
      }).map((_, index) => (
        <PickingButton
          key={index}
          buttonIndex={index}
          pickingPanelContext={pickingPanelContext}
        />
      )),
    []
  );

  return (
    <div className="square-fragments-memorization-game__puzzle-panel">
      <ProgressBar indicatorsStatuses={progressbarIndicators} />
      <div className="square-fragments-memorization-game__picking-panel">
        {pickingButtons}
      </div>
    </div>
  );
};

export default PickingPanel;
