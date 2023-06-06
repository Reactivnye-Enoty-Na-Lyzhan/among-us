import { FC, memo } from 'react';
import { IHintData } from '@/utils/how-to-play/hintData';
import './Hint.css';

const Hint: FC<IHintData> = props => {
  const { title, description, additional } = props;

  return (
    <li className="howtoplay__hint">
      <h2 className="howtoplay__hint-title">{title}</h2>
      <p className="howtoplay__hint-description">{description}</p>
      <p className="howtoplay__hint-additional">{additional}</p>
    </li>
  );
};

export default memo(Hint);
