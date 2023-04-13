import { FC, memo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LeaderBoardPlayer from './LeaderBoardPlayer/LeaderBoardPlayer';
import {
  additionalData,
  leaderboardData,
  LeaderboardDataType,
} from '../../utils/leaderboardData';
import './LeaderBoard.css';

const LeaderBoard: FC = () => {
  const [isMenuOpened, setMenuOpened] = useState<boolean>(false);
  const [leaderboardUsers, setLeaderboardUsers] = useState<
    LeaderboardDataType[] | []
  >([]);
  const [isProccessing, setIsProcessing] = useState<boolean>(false);
  const [isSortedBy, setSortedBy] = useState<string>('rank');

  const navigate = useNavigate();

  // Текущий, супервременный, пользователь
  const currentUser = 'loshadka';

  // Отображение состояния загрузки игроков из таблицы рейтинга
  const buttonTitle = isProccessing ? 'Загружаем...' : 'Показать ещё';

  // Классы меню сортировки
  const winButtonClass = `leaderboard__sort-variant ${
    isSortedBy === 'win' ? 'leaderboard__sort-variant_active' : ''
  }`;

  const gamesButtonClass = `leaderboard__sort-variant ${
    isSortedBy === 'games' ? 'leaderboard__sort-variant_active' : ''
  }`;

  const rankButtonClass = `leaderboard__sort-variant ${
    isSortedBy === 'rank' ? 'leaderboard__sort-variant_active' : ''
  }`;

  // Запрашиваем отсортированную таблицу по "месту в рейтинге"
  useEffect(() => {
    // Обращение к серверу за данными
  }, []);

  // Добавляем полученные данные игроков
  useEffect(() => {
    setLeaderboardUsers([...leaderboardUsers, ...leaderboardData]);
  }, [leaderboardData]);

  // Обработчик открытия меню
  const handleOpenMenu = () => {
    setMenuOpened(!isMenuOpened);
  };

  // Сортировка в зависимости от выбранного типа
  const handleSort = (type: string) => {
    switch (type) {
      // запрос отсортированного значения
      case 'win':
        setSortedBy('win');
        break;
      case 'games':
        setSortedBy('games');
        break;
      case 'rank':
        setSortedBy('rank');
        break;
      default:
        break;
    }

    setMenuOpened(false);
  };

  // Отобразить больше игроков
  const showMore = () => {
    if (isProccessing) return;
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
        <div className="leaderboard__sort-menu">
          <button className="leaderboard__sort-button" onClick={handleOpenMenu}>
            <span className="leaderboard__menu-title">Сортировать</span>
            <span
              className={`leaderboard__menu-icon${
                isMenuOpened ? ' leaderboard__menu-icon_opened' : ''
              }`}></span>
          </button>
          <ul
            className={`leaderboard__dropdown${
              isMenuOpened ? ' leaderboard__dropdown_opened' : ''
            }`}>
            <li className="leaderboard__dropdown-item">
              <button
                className={winButtonClass}
                type="button"
                onClick={() => handleSort('win')}>
                Высокий процент побед
              </button>
            </li>
            <li className="leaderboard__dropdown-item">
              <button
                className={gamesButtonClass}
                type="button"
                onClick={() => handleSort('games')}>
                Количество сыгранных игр
              </button>
            </li>
            <li className="leaderboard__dropdown-item">
              <button
                className={rankButtonClass}
                type="button"
                onClick={() => handleSort('rank')}>
                Общий рейтинг
              </button>
            </li>
          </ul>
        </div>
        <ul className="leaderboard__rating-board">
          {leaderboardUsers.map(player => (
            <LeaderBoardPlayer
              key={player.nickname}
              avatar={player.avatar}
              nickname={player.nickname}
              games={player.games}
              wins={player.wins}
              rank={player.rank}
              owner={player.nickname === currentUser}
            />
          ))}
        </ul>
        <button
          className="leaderboard__show-more"
          onClick={showMore}
          disabled={isProccessing}>
          {buttonTitle}
        </button>
      </div>
    </main>
  );
};

export default memo(LeaderBoard);
