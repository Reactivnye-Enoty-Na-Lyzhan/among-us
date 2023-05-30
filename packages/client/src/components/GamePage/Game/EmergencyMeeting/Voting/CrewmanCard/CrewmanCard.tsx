import { FC, memo } from 'react';
import classNames from 'classnames';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { selectPlayer } from '@/store/game/game.slice';
import type { User } from '@/store/auth/auth.types';
import type { SuitColorsType } from '@/utils/gameParams';
import type { IPlayer } from '@/store/game/game.types';
import './CrewmanCard.css';

type Props = Pick<User, 'login' | 'nickname'> & {
  initiator: boolean;
  color: keyof SuitColorsType;
  id: IPlayer['id'];
  isVotedFor: boolean;
  voted: boolean;
  onVote: (targetId: IPlayer['id']) => void;
}

const CrewmanCard: FC<Props> = (props) => {
  const { id: currentPlayerId } = useTypedSelector(selectPlayer);
  const {
    login,
    nickname,
    initiator,
    color,
    id,
    isVotedFor,
    voted,
    onVote,
  } = props;

  const cardClassname = classNames('crewman-card', {
    ['crewman-card_self']: currentPlayerId === id,
    ['crewman-card_voted-for']: isVotedFor,
  });

  const avatarClassname = classNames('crewman-card__avatar', {
    [`crewman-card__avatar_player_${color}`]: true,
  });

  const avatarOverlayClassname = classNames('crewman-card__avatar-overlay', {
    ['crewman-card__avatar-overlay_voted']: voted,
  });

  const handleVote = () => {
    onVote(id);
  };

  return (
    <li className={cardClassname} onClick={handleVote}>
      <div className="crewman-card__avatar-container">
        <span className={avatarOverlayClassname}>&#10003;</span>
        <div className={avatarClassname} />
      </div>
      <h3 className="crewman-card__crewman-name">{nickname ?? login}</h3>
      {!initiator && <span className="crewman-card__initiator-icon" />}
    </li>
  );
};

export default memo(CrewmanCard);
