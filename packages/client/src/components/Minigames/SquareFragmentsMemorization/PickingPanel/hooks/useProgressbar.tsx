import { useEffect, useState } from 'react';
import type { ProgressbarIndicatorStatus } from '../../ProgressBar/ProgressBar';
import type { PickingPanelContext } from '../types';

type Args = {
  pickingPanelContext: PickingPanelContext;
};

export function useProgressbar({ pickingPanelContext }: Args) {
  const [progressbarIndicators, setProgressbarIndicators] = useState<
    ProgressbarIndicatorStatus[]
  >([]);

  useEffect(() => {
    const resetProgressbar = () => {
      setProgressbarIndicators([]);
    };

    const expandProgressbar = (indicatorStatus: ProgressbarIndicatorStatus) => {
      setProgressbarIndicators(indicators => [...indicators, indicatorStatus]);
    };

    pickingPanelContext.resetProgressbar = resetProgressbar;
    pickingPanelContext.expandProgressbar = expandProgressbar;
  }, []);

  return {
    progressbarIndicators,
  };
}
