import { useTypedSelector } from '@/hooks/useTypedSelector';
import { selectIsLoading } from '@/store/ui/ui.slice';
import { memo, useEffect, useState, type FC } from 'react';
import { LoaderScreen } from './LoaderScreen/LoaderScreen';

const Loader: FC = () => {
  const [isDisplayed, setIsDisplayed] = useState<boolean>(false);
  const isLoading = useTypedSelector(selectIsLoading);

  useEffect(() => {
    if (isLoading) {
      setIsDisplayed(true);
    } else {
      setTimeout(() => {
        setIsDisplayed(false);
      }, 1500);
    }
  }, [isLoading]);

  return isDisplayed ? <LoaderScreen /> : <></>;
};

export default memo(Loader);
