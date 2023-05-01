import { FC, memo, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import hocAuth from '@/hoc/hocAuth';
import RatingTable from './RatingTable/RatingTable';
import SortMenu from './SortingMenu/SortingMenu';
import './LeaderBoard.css';
import AddCardForm from './PostCardForm/PostRatingForm';

const LeaderBoard: FC = () => {
  const [isAddFormActive, setIsAddFormActive] = useState<boolean>(false);

  const navigate = useNavigate();

  const toggleAddCardForm = useCallback(() => {
    setIsAddFormActive(isActive => !isActive);
  }, []);

  // Отобразить больше игроков
  const showMore = () => {
    //
  };

  return (
    <main className="leaderboard">
      <div className="leaderboard__return-link" onClick={() => navigate(-1)}>
        <span className="leaderboard__return-icon"></span>
        <h1 className="leaderboard__title">Рейтинг игроков</h1>
      </div>
      <div className="leaderboard__container">
        <section className="leaderboard__functional-section">
          <SortMenu></SortMenu>
          <button
            className="leaderboard__post-rating-button leaderboard__functional-button"
            onClick={toggleAddCardForm}>
            Опубликовать рейтинг
          </button>
        </section>
        <section className="leaderboard__rating-section">
          {isAddFormActive && <AddCardForm></AddCardForm>}
          <RatingTable></RatingTable>
        </section>

        <button className="leaderboard__show-more" onClick={showMore}>
          Показать еще
        </button>
      </div>
    </main>
  );
};

export default hocAuth(memo(LeaderBoard));
