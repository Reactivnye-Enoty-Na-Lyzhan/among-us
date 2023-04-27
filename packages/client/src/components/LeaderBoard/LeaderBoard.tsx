import { FC, memo, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  additionalData,
  leaderboardData,
  LeaderboardDataType,
} from '../../utils/leaderboardData';
import hocAuth from '@/hoc/hocAuth';
import RatingTable from './RatingTable/RatingTable';
import { EnumSortType } from './enum-sort-types';
import SortMenu from './SortMenu/SortMenu';
import './LeaderBoard.css';

const LeaderBoard: FC = () => {
  const [leaderboardUsers, setLeaderboardUsers] = useState<
    LeaderboardDataType[] | []
  >([]);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const navigate = useNavigate();

  // Отображение состояния загрузки игроков из таблицы рейтинга
  const buttonTitle = isProcessing ? 'Загружаем...' : 'Показать ещё';

  // Добавляем полученные данные игроков
  useEffect(() => {
    setLeaderboardUsers([...leaderboardUsers, ...leaderboardData]);
  }, [leaderboardData]);

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
    if (isProcessing) return;
    // отправить запрос и получить следующих игроков
    // Просто заглушечка, лучше много не тыкать :)
    setIsProcessing(true);
    setTimeout(() => {
      setLeaderboardUsers([...leaderboardUsers, ...additionalData]);
      setIsProcessing(false);
    }, 3000);
  };

  return (
    <main className="leaderboard">
      <div className="leaderboard__return-link" onClick={() => navigate(-1)}>
        <span className="leaderboard__return-icon"></span>
        <h1 className="leaderboard__title">Рейтинг игроков</h1>
      </div>
      <div className="leaderboard__container">
        <SortMenu handleSort={handleSort}></SortMenu>
        <RatingTable playersEntries={leaderboardUsers}></RatingTable>
        <button
          className="leaderboard__show-more"
          onClick={showMore}
          disabled={isProcessing}>
          {buttonTitle}
        </button>
      </div>
    </main>
  );
};

export default hocAuth(memo(LeaderBoard));
