import { useEffect, useRef } from "react";
import type { WithPickingPanelContextArgs } from "./types";
import type { PickingPanelContext } from "../types";

export function usePickStatus({
  pickingPanelContext,
}: WithPickingPanelContextArgs) {
  const currentPickIndexRef = useRef<number>(0);
  const lastPickStatusRef: PickingPanelContext["lastPickStatusRef"] =
    useRef(null);

  useEffect(() => {
    const resetCurrentPickIndex = () => {
      currentPickIndexRef.current = 0;
    };

    const incrementCurrentPickIndex = () => {
      currentPickIndexRef.current++;
    };

    pickingPanelContext.resetCurrentPickIndex =
      resetCurrentPickIndex;
    pickingPanelContext.incrementCurrentPickIndex =
      incrementCurrentPickIndex;
    pickingPanelContext.currentPickIndexRef =
      currentPickIndexRef;
    pickingPanelContext.lastPickStatusRef =
      lastPickStatusRef;
  }, []);
}
