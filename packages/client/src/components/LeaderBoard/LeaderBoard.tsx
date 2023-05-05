import { FC, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import hocAuth from '@/hoc/hocAuth';
import RatingTable from './RatingTable/RatingTable';
import SortMenu from './SortingMenu/SortingMenu';
import './LeaderBoard.css';
import ShowMoreRatingsButton from './ShowMoreRatingsButton/ShowMoreRatingsButton';

const LeaderBoard: FC = () => {
  const navigate = useNavigate();

  return (
    <main className="leaderboard">
      <div className="leaderboard__return-link" onClick={() => navigate(-1)}>
        <span className="leaderboard__return-icon"></span>
        <h1 className="leaderboard__title">Рейтинг игроков</h1>
      </div>
      <div className="leaderboard__container">
        <SortMenu />
        <RatingTable />
        <ShowMoreRatingsButton />
      </div>
    </main>
  );
};

export default hocAuth(memo(LeaderBoard));
