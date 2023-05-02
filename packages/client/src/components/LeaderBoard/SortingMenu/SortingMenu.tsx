import { FC, memo, useCallback, useMemo, useState } from 'react';
import SortMenuVariant from './SortingVariant/SortingVariant';
import type { OnSelectHandler } from './SortingVariant/types';
import './SortingMenu.css';
import { EnumRatingTypes } from '@/store/api/leaderboard/enumerations';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { leaderboardActionsDispatcher } from '@/store/leaderboard/leaderboard.dispatcher';
import { selectSortingType } from '@/store/leaderboard/selectors';

const mapSortingTypeToDescription: Record<EnumRatingTypes, string> = {
  [EnumRatingTypes.WINRATE]: 'Высокий процент побед',
  [EnumRatingTypes.GAMES]: 'Количество сыгранных игр',
  [EnumRatingTypes.MAX_SCORE]: 'Лучший счёт',
};

const SortMenu: FC = () => {
  const [isOpened, setIsOpened] = useState(false);

  const sortingTypeSelected = useTypedSelector(selectSortingType);

  const toggleIsOpenedState = useCallback(() => {
    setIsOpened(isOpened => !isOpened);
  }, []);

  const mapSortingTypeToOnSelectHandler = useMemo(() => {
    const sortingTypes = Object.values(EnumRatingTypes) as EnumRatingTypes[];

    const onSelectHandlers = {} as Record<EnumRatingTypes, OnSelectHandler>;
    sortingTypes.forEach(sortingType => {
      const handler = () => {
        leaderboardActionsDispatcher.setSortingType(sortingType);
        setIsOpened(false);
      };
      onSelectHandlers[sortingType] = handler;
    });

    return onSelectHandlers;
  }, []);

  const SortingVariants = useMemo(() => {
    const sortingTypes = Object.values(EnumRatingTypes) as EnumRatingTypes[];

    const components = sortingTypes.map(sortingType => (
      <SortMenuVariant
        key={sortingType}
        description={mapSortingTypeToDescription[sortingType]}
        isSelected={sortingType === sortingTypeSelected}
        onSelectHandler={
          mapSortingTypeToOnSelectHandler[sortingType]
        }></SortMenuVariant>
    ));

    return components;
  }, [sortingTypeSelected]);

  return (
    <div className="leaderboard__sort-menu">
      <button
        className="leaderboard__sort-button leaderboard__functional-button"
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
        {SortingVariants}
      </ul>
    </div>
  );
};

export default memo(SortMenu);
