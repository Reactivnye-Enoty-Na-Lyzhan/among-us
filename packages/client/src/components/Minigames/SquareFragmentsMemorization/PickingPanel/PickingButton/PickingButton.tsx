import { useState, type FC, useContext, useMemo } from 'react';
import { type NodeProps, PickStatus, type ComponentProps } from './types';
import { ProgressbarIndicatorStatus } from '../../ProgressBar/ProgressBar';
import './PickingButton.css';
import { GameContext } from '../../GameContext/context';

const PickingButton: FC<ComponentProps> = ({
  buttonIndex,
  pickingPanelContext,
}) => {
  const [pickStatus, setPickStatus] = useState(PickStatus.NOT_PICKED);
  const { memorizationSequenceRef } = useContext(GameContext);

  useMemo(
    () =>
      (pickingPanelContext.resetPickButton[buttonIndex] = () =>
        setPickStatus(PickStatus.NOT_PICKED)),
    []
  );

  let className = 'square-fragments-memorization-game__picking-button';
  if (pickStatus === PickStatus.SUCCESS) {
    className += ' square-fragments-memorization-game__picking-button_success';
  } else if (pickStatus === PickStatus.ERROR) {
    className += ' square-fragments-memorization-game__picking-button_error';
  }

  const props: NodeProps = {
    className,
  };

  props.onClick = () => {
    const { isPickingBlockedRef } = pickingPanelContext;
    if (pickStatus === PickStatus.SUCCESS || isPickingBlockedRef.current) {
      return;
    }

    const {
      currentPickIndexRef,
      lastPickStatusRef,
      incrementCurrentPickIndex,
      resetPickedSequence,
      expandProgressbar,
    } = pickingPanelContext;
    const memorizationSequence = memorizationSequenceRef.current;

    const isRightPick =
      memorizationSequence[currentPickIndexRef.current] === buttonIndex;
    lastPickStatusRef.current = {
      isRightPick,
      fragmentIndex: buttonIndex,
    };

    if (isRightPick) {
      setPickStatus(PickStatus.SUCCESS);
      expandProgressbar(ProgressbarIndicatorStatus.SUCCESS);

      if (currentPickIndexRef.current + 1 === memorizationSequence.length) {
        resetPickedSequence();
      } else {
        incrementCurrentPickIndex();
      }
    } else {
      setPickStatus(PickStatus.ERROR);
      expandProgressbar(ProgressbarIndicatorStatus.ERROR);
      resetPickedSequence();
    }
  };

  return <button {...props}></button>;
};

export default PickingButton;
