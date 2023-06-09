import { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../Header/Header';
import hocAuth from '@/hoc/hocAuth';
import { SIGNIN_URL } from '@/utils/constants';
import './PostPage.css';
import '../Page/Page.css';
import {
  useGetMessagesDataQuery,
  useGetPostDataQuery,
} from '@/store/forum/forum.api';
import ForumMessages from '../Messages/Messages';
import ForumPostNewMessage from '../Messages/NewMessage/NewMessage';
import { useGetUserQuery } from '@/store/auth/auth.slice';
import { ForumMessageType } from '@/store/forum/forum.types';

const ForumPostPage: FC = () => {
  const { postId } = useParams();

  const [messageParent, setMessageParent] = useState<
    ForumMessageType | undefined
  >(undefined);

  const { data: user } = useGetUserQuery();
  const { data } = useGetPostDataQuery({
    postId: postId ? Number(postId) : 0,
  });

  const { data: messages, refetch: refetchMessages } = useGetMessagesDataQuery({
    postId: postId ? Number(postId) : 0,
  });

  return (
    <div className="forum forum-post">
      <Header title={data?.title ?? ''} />
      <main className="forum__container forum-post__container">
        <div className="forum-post__text">{data?.text}</div>
        <ForumMessages
          messages={messages ?? []}
          user={user}
          postId={Number(postId)}
          messageParent={messageParent}
          setMessageParent={setMessageParent}
        />
        <ForumPostNewMessage
          postId={Number(postId)}
          refetchMessages={refetchMessages}
          messageParent={messageParent}
          setMessageParent={setMessageParent}
        />
      </main>
    </div>
  );
};

export default hocAuth(ForumPostPage, {
  onAuthenticatedRedirection: null,
  onUnauthenticatedRedirection: SIGNIN_URL,
});
