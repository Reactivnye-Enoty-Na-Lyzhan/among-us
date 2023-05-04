import { FC, memo, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import hocAuth from '@/hoc/hocAuth';
import RatingTable from './RatingTable/RatingTable';
import SortMenu from './SortingMenu/SortingMenu';
import './LeaderBoard.css';
import AddCardForm from './PostRatingForm/PostRatingForm';
import ShowMoreRatingsButton from './ShowMoreRatingsButton/ShowMoreRatingsButton';

const LeaderBoard: FC = () => {
  const [isAddFormActive, setIsAddFormActive] = useState<boolean>(false);

  const navigate = useNavigate();

  const toggleAddCardForm = useCallback(() => {
    setIsAddFormActive(isActive => !isActive);
  }, []);

  return (
    <main className="leaderboard">
      <div className="leaderboard__return-link" onClick={() => navigate(-1)}>
        <span className="leaderboard__return-icon"></span>
        <h1 className="leaderboard__title">Рейтинг игроков</h1>
      </div>
      <div className="leaderboard__container">
        <section className="leaderboard__functional-section">
          <SortMenu />
          <button
            className="leaderboard__post-rating-button leaderboard__functional-button"
            onClick={toggleAddCardForm}>
            Опубликовать рейтинг
          </button>
        </section>
        <section className="leaderboard__rating-section">
          {isAddFormActive && <AddCardForm />}
          <RatingTable />
        </section>

        <ShowMoreRatingsButton />
      </div>
    </main>
  );
};

export default hocAuth(memo(LeaderBoard));
