import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { gameActions } from '../store/game/game.slice';
import { uiActions } from '@/store/ui/ui.slice';
import { leaderboardActions } from '@/store/leaderboard/leaderboard.slice';

const allActions = {
  ...gameActions,
  ...uiActions,
  ...leaderboardActions,
};

export const useActions = () => {
  const dispatch = useDispatch<AppDispatch>();

  return bindActionCreators(allActions, dispatch);
};
