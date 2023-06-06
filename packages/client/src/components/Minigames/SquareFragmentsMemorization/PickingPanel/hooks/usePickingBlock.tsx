import { useContext, useEffect, useRef } from 'react';
import type { WithPickingPanelContextArgs } from './types';
import { GameContext } from '../../GameContext/context';
import { GameStage } from '../../GameContext/types';

export function usePickingBlock({
  pickingPanelContext,
}: WithPickingPanelContextArgs) {
  const { gameStatusRef } = useContext(GameContext);
  const gameStage = gameStatusRef.current.stage;

  const isPickingBlockedRef = useRef<boolean>(
    gameStage !== GameStage.REPRODUCTION
  );

  useEffect(() => {
    const blockPicking = () => {
      isPickingBlockedRef.current = true;
    };

    const unblockPicking = () => {
      isPickingBlockedRef.current = false;
    };

    pickingPanelContext.isPickingBlockedRef = isPickingBlockedRef;
    pickingPanelContext.blockPicking = blockPicking;
    pickingPanelContext.unblockPicking = unblockPicking;
  }, []);

  useEffect(() => {
    isPickingBlockedRef.current = gameStage !== GameStage.REPRODUCTION;
  }, [gameStage]);
}
