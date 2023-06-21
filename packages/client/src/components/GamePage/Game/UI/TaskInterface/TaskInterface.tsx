import { FC, memo } from 'react';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { selectPlayer } from '@/store/game/game.slice';
import { ImpostorsTasks } from '@/utils/game/ImpostorsTasks';
import { CivilsTasks } from '@/utils/game/CivilsTasks';
import './TaskInterface.css';
import classNames from 'classnames';

const TaskInterface: FC = () => {
  const targetTask = useTypedSelector(state => state.game.task.targetTask);
  const player = useTypedSelector(selectPlayer);

  const tasks = player.role === 'impostor' ? ImpostorsTasks : CivilsTasks;

  const taskInterfceClassname = classNames('task-interface', {
    'task-interface_hidden': !player.alive,
  });

  return (
    <div className={taskInterfceClassname}>
      <h3 className="task-interface__title">Текущее задание</h3>
      <p className="task-interface__task">{tasks[targetTask]}</p>
    </div>
  );
};

export default memo(TaskInterface);
