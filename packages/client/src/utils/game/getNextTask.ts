import { miniGamesList } from '@/utils/game/mingames';

export const getRandomTask = (avaliableTasks: string[]): number => {
  const result =
    avaliableTasks[Math.floor(Math.random() * avaliableTasks.length)];
  return Number(result);
};

export const getNextTask = (
  currentTask: number,
  lastTask: number | null
): number | null => {
  console.log('LAST | CURRENT', lastTask, currentTask);
  const avaliableTask = miniGamesList.filter(gameId => {
    const currentGameId = Number(gameId);
    return currentGameId !== currentTask && currentGameId !== lastTask;
  });

  if (!avaliableTask.length) return Number(avaliableTask[0]);

  return getRandomTask(avaliableTask);
};
