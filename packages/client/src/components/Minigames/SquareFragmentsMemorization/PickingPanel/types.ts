import type { ProgressbarIndicatorStatus } from '../ProgressBar/ProgressBar';
type Callback = () => void;

export type PickingPanelContext = {
  isPickingBlockedRef: React.MutableRefObject<boolean>;
  blockPicking: Callback;
  unblockPicking: Callback;

  currentPickIndexRef: React.MutableRefObject<number>;
  resetCurrentPickIndex: Callback;
  incrementCurrentPickIndex: Callback;
  lastPickStatusRef: React.MutableRefObject<{
    fragmentIndex: number;
    isRightPick: boolean;
  } | null>;

  resetPickedSequence: Callback;
  resetPickButton: Record<number, Callback>;
  resetProgressbar: Callback;
  expandProgressbar: (indicatorStatus: ProgressbarIndicatorStatus) => void;
};
