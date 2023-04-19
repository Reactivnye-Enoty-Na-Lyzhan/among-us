import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { gameActions } from '../store/game/game.slice';
import { AppDispatch } from '@/store';

const allActions = {
  ...gameActions,
};

export const useActions = () => {
  const dispatch = useDispatch<AppDispatch>();

  return bindActionCreators(allActions, dispatch);
};
