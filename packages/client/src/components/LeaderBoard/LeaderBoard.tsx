import { FC, memo, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import hocAuth from '@/hoc/hocAuth';
import RatingTable from './RatingTable/RatingTable';
import { EnumSortType } from './enum-sort-types';
import SortMenu from './SortMenu/SortMenu';
import './LeaderBoard.css';
import AddCardForm from './AddCardForm/AddCardForm';

const LeaderBoard: FC = () => {
  const [isAddFormActive, setIsAddFormActive] = useState<boolean>(false);

  const navigate = useNavigate();

  const toggleAddCardForm = useCallback(() => {
    setIsAddFormActive(isActive => !isActive);
  }, []);

  // Сортировка в зависимости от выбранного типа
  const handleSort = useCallback((sortType: EnumSortType) => {
    switch (sortType) {
      // запрос отсортированного значения
      case EnumSortType.WINRATE:
        break;
      case EnumSortType.GAMES:
        break;
      case EnumSortType.RANK:
        break;
      default:
        break;
    }
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
          <SortMenu handleSort={handleSort}></SortMenu>
          <button
            className="leaderboard__add-card-button leaderboard__functional-button"
            onClick={toggleAddCardForm}>
            Добавить карточку
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
