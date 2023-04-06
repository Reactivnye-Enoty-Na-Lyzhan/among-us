import { FC, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import './HowToPlay.css';

const HowToPlay: FC = () => {
  const navigate = useNavigate();

  return (
    <div className="howtoplay">
      <h1 className="howtoplay__title">Как играть?</h1>
      <p className="howtoplay__helper-text">
        Никто не знает, как играть. Идите-ка обратно
      </p>
      <button className="howtoplay__go-back" onClick={() => navigate(-1)}>
        Хорошо, хорошо!
      </button>
    </div>
  );
};

export default memo(HowToPlay);
