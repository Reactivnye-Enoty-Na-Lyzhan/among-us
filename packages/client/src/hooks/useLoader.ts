import { LoaderScreen } from '@/components/Loader/LoaderScreen/LoaderScreen';
import { useEffect, useState } from 'react';

type Args = {
  minDisplayTimeMS: number;
  isLoading: boolean;
};

const LoaderScreenComponent = LoaderScreen;

export function useLoader({ minDisplayTimeMS, isLoading }: Args) {
  const [isDisplayTimeoutExceeded, setIsDisplayTimeoutExceeded] =
    useState<boolean>(!isLoading);

  useEffect(() => {
    setTimeout(() => {
      setIsDisplayTimeoutExceeded(true);
    }, minDisplayTimeMS);
  }, []);

  const isDisplayed = isLoading || !isDisplayTimeoutExceeded;
  return {
    LoaderScreenComponent,
    isDisplayed,
    isDisplayTimeoutExceeded,
  };
}
