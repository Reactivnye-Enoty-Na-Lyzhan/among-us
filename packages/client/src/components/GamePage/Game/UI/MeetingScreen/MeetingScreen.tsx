import { FC, memo } from 'react';
import classNames from 'classnames';
import type { PlayerRoleType } from '@/store/game/game.types';
import type { SuitColorsType } from '@/utils/gameParams';
import './MeetingScreen.css';

interface IRoleText {
  heading: string;
  description: string;
}

type TextComponents = {
  [k in PlayerRoleType]: IRoleText;
};

interface IProps {
  role: PlayerRoleType;
  color: keyof SuitColorsType;
}

const Meeting: FC<IProps> = props => {
  const { role, color } = props;

  const textComponents: TextComponents = {
    civil: {
      heading: 'Как же жаль...',
      description:
        'Вы выбросили в открытый космос своего товарища... А предатель по-прежнему среди вас!',
    },
    impostor: {
      heading: 'А вы хороши!',
      description:
        'Предатель будет очень-очень долго лететь в холодном-холодном космосе!',
    },
  };

  const crewmanClass = classNames('meeting-informer__crewman', {
    [`meeting-informer__crewman_color_${color}`]: true,
  });

  return (
    <div className="meeting-informer">
      <div className="meeting-informer__stars" />
      <span className={crewmanClass} />
      <h3 className="meeting-informer__title">
        {textComponents[role].heading}
      </h3>
      <p className="meeting-informer__description">
        {textComponents[role].description}
      </p>
    </div>
  );
};

export default memo(Meeting);
