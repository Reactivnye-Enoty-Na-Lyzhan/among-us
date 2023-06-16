import { createContext } from 'react';
import { type GameContext as TGameContext } from './types';

export const GameContext = createContext({} as TGameContext);
