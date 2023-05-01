import { bindActionCreators } from '@reduxjs/toolkit';
import { dispatch } from '..';
import { leaderboardActions } from './leaderboard.slice';

export const leaderboardActionsDispatcher = bindActionCreators(
  leaderboardActions,
  dispatch
);
