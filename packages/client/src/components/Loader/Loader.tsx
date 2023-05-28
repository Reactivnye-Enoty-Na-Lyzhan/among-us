import { FC, memo, useEffect, useState } from 'react';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { selectIsLoading } from '@/store/ui/ui.slice';
import './Loader.css';

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

  return (
    <>
      {isDisplayed && (
        <div className="loader">
          <div className="loader__stars"></div>
          <div className="loader__stars loader__stars_position_middle"></div>
          <div className="loader__rocket-container">
            <div className="loader__flame"></div>
            <div className="loader__rocket"></div>
          </div>
          <p className="loader__title">Доставляем удовольствие. Ожидайте</p>
        </div>
      )}
    </>
  );
};

export default memo(Loader);
