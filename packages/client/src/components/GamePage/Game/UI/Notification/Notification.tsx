import { FC, memo, useEffect, useState } from 'react';
import classNames from 'classnames';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { selectGameError } from '@/store/game/game.slice';
import './Notification.css';

// Модальное окошко с игровыми уведомлениями
const Notification: FC = () => {
  const [isShown, setIsShown] = useState<boolean>(false);
  const { title, text } = useTypedSelector(selectGameError);

  useEffect(() => {
    setIsShown(true);

    return () => setIsShown(false);
  }, []);

  const containerClassname = classNames('game-notification', {
    'game-notification_shown': isShown,
  });

  return (
    <div className={containerClassname}>
      <h3 className="game-notification__title">{title}</h3>
      <p className="game-notification__description">{text}</p>
    </div>
  );
};

export default memo(Notification);
