import { useCallback, useMemo, useState } from 'react';
import { SortMenuVariant } from './SortVariant/SortVariant';
import { SortFunction } from './types';
import { EnumSortType } from '../enum-sort-types';
import './SortMenu.css';

type Props = {
  handleSort: (sortType: EnumSortType) => void;
};

export function SortMenu({ handleSort }: Props) {
  const [menuState, setMenuState] = useState({
    isOpened: false,
    sortTypeSelected: EnumSortType.RANK,
  });
  const { isOpened, sortTypeSelected } = menuState;

  const toggleIsOpenedState = useCallback(() => {
    setMenuState(prevState => ({
      ...prevState,
      isOpened: !prevState.isOpened,
    }));
  }, []);

  const sortByType = useMemo(() => {
    const sortTypes = Object.values(EnumSortType) as EnumSortType[];

    return sortTypes.reduce((result, sortType) => {
      result[sortType] = () => {
        handleSort(sortType);
        setMenuState({ isOpened: false, sortTypeSelected: sortType });
      };
      return result;
    }, {} as Record<EnumSortType, SortFunction>);
  }, [handleSort]);

  return (
    <div className="leaderboard__sort-menu">
      <button
        className="leaderboard__sort-button"
        onClick={toggleIsOpenedState}>
        <span className="leaderboard__menu-title">Сортировать</span>
        <span
          className={`leaderboard__menu-icon${
            isOpened ? ' leaderboard__menu-icon_opened' : ''
          }`}></span>
      </button>
      <ul
        className={`leaderboard__dropdown${
          isOpened ? ' leaderboard__dropdown_opened' : ''
        }`}>
        <SortMenuVariant
          isSelected={sortTypeSelected === EnumSortType.WINRATE}
          description="Высокий процент побед"
          sortFunction={sortByType[EnumSortType.WINRATE]}></SortMenuVariant>
        <SortMenuVariant
          isSelected={sortTypeSelected === EnumSortType.GAMES}
          description="Количество сыгранных игр"
          sortFunction={sortByType[EnumSortType.GAMES]}></SortMenuVariant>
        <SortMenuVariant
          isSelected={sortTypeSelected === EnumSortType.RANK}
          description="Общий рейтинг"
          sortFunction={sortByType[EnumSortType.RANK]}></SortMenuVariant>
      </ul>
    </div>
  );
}
