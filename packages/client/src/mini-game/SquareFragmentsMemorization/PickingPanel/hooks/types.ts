import type { PickingPanelContext } from '../types';

export type WithPickingPanelContextArgs<Args = Record<string, never>> = {
  pickingPanelContext: PickingPanelContext;
} & Args;
