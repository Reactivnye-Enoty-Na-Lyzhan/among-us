import {
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { WithPickingPanelContextArgs } from "./types";
import { GameContext } from "../../GameContext/context";

const RESETTING_DURATION = 1000;

export const enum ResettingType {
  ON_ERROR,
  ON_COMPLETION,
}

export function usePickedSequenceResetting({
  pickingPanelContext,
}: WithPickingPanelContextArgs) {
  const [
    isPickedSequenceResetting,
    setIsPickedSequenceResetting,
  ] = useState(false);
  const gameContext = useContext(GameContext);

  useEffect(() => {
    const resetPickedSequence = () => {
      pickingPanelContext.blockPicking();
      setIsPickedSequenceResetting(true);
    };

    pickingPanelContext.resetPickedSequence =
      resetPickedSequence;
  }, []);

  const resetPickingPanel = useCallback(
    async (resettingType: ResettingType) => {
      const {
        currentPickIndexRef,
        lastPickStatusRef,
        resetProgressbar,
        resetCurrentPickIndex,
        unblockPicking,
      } = pickingPanelContext;

      const sequenceToReset =
        gameContext.memorizationSequenceRef.current.slice(
          0,
          currentPickIndexRef.current
        );
      const lastPickStatus =
        lastPickStatusRef.current;
      if (lastPickStatus !== null) {
        sequenceToReset.push(
          lastPickStatus.fragmentIndex
        );
      }

      const resetButtons = sequenceToReset.map(
        (fragmentIndex) =>
          new Promise<void>((resolve) => {
            setTimeout(() => {
              pickingPanelContext.resetPickButton[
                fragmentIndex
              ]?.();
            }, RESETTING_DURATION);
            resolve();
          })
      );
      const resetProgressbarPromise =
        new Promise<void>((resolve) => {
          setTimeout(() => {
            resetProgressbar();
            resolve();
          }, RESETTING_DURATION);
        });

      await Promise.all([
        ...resetButtons,
        resetProgressbarPromise,
      ]);

      if (
        resettingType === ResettingType.ON_ERROR
      ) {
        console.log(
          `RESET ON ERROR: ${JSON.stringify(
            sequenceToReset
          )}`
        );
      } else if (
        resettingType ===
        ResettingType.ON_COMPLETION
      ) {
        console.log(
          `RESET ON COMPLETION: ${JSON.stringify(
            sequenceToReset
          )}`
        );

        gameContext.increaseStageLevel();
        gameContext.switchStageType();
      }

      setIsPickedSequenceResetting(false);
      unblockPicking();
      resetCurrentPickIndex();
    },
    []
  );

  useEffect(() => {
    if (isPickedSequenceResetting) {
      const lastPickStatus =
        pickingPanelContext.lastPickStatusRef
          .current;

      const resettingType =
        lastPickStatus?.isRightPick
          ? ResettingType.ON_COMPLETION
          : ResettingType.ON_ERROR;
      resetPickingPanel(resettingType);
    }
  }, [isPickedSequenceResetting]);
}
