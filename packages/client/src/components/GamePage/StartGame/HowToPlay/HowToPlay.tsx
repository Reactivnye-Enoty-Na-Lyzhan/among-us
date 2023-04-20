import { FC, MouseEventHandler, memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Hint from './Hint/Hint';
import { hintData } from '@/utils/how-to-play/hintData';
import './HowToPlay.css';

const HowToPlay: FC = () => {
  const navigate = useNavigate();

  // Вернуть пользователя на предыдущую страницу
  const goBack: MouseEventHandler<HTMLAnchorElement> = (evt) => {
    evt.preventDefault();
    navigate(-1);
  };

  return (
    <div className="howtoplay">
      <h1 className="howtoplay__title">Как играть?</h1>
      <p className="howtoplay__helper-text">
        Если вы очень хотите поиграть в нашу игру на её раннем этапе разработки, то почитайте советы по игре ниже!
      </p>
      <ul className="howtoplay__hint-table">
        {hintData.map((hint) =>
          <Hint
            title={hint.title}
            description={hint.description}
            additional={hint.additional}
          />
        )}
      </ul>
      <Link to='/game' className="howtoplay__go-back" onClick={goBack}>
        Спасибо, всё понятно! Хочу играть!
      </Link>
    </div>
  );
};

export default memo(HowToPlay);
