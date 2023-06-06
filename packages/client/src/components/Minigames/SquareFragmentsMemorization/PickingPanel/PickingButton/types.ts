import type { PickingPanelContext } from "../types";

export const enum PickStatus {
  SUCCESS,
  ERROR,
  NOT_PICKED,
}

export type ComponentProps = {
  buttonIndex: number;
  pickingPanelContext: PickingPanelContext;
};

export type NodeProps = Pick<
  React.HTMLAttributes<HTMLButtonElement>,
  "className" | "onClick"
>;
