import { FC, memo } from 'react';
import classNames from 'classnames';
import type { IPlayerWithUser } from '@/store/game/game.types';
import './Message.css';


interface IProps {
  text: string;
  author: IPlayerWithUser;
}

const Message: FC<IProps> = (props) => {
  const { text, author, } = props;

  const authorClassname = classNames('chat-message__author', {
    [`chat-message__author_color_${author.color}`]: true,
  });

  return (
    <li className="chat-message">
      <p className="chat-message__text">{text}</p>
      <p className={authorClassname}>{author.user?.login}</p>
    </li>
  );
};

export default memo(Message);
