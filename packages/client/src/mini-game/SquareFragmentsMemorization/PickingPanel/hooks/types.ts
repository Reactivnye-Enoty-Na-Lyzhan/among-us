import type { PickingPanelContext } from '../types';

export type WithPickingPanelContextArgs<
  // eslint-disable-next-line @typescript-eslint/ban-types
  Args extends Record<string, unknown> = {}
> = {
  pickingPanelContext: PickingPanelContext;
} & Args;
