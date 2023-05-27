import Header from '@/components/Header/Header';
import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import './../Page/Page.css';
import './EditPostPage.css';
import ForumEditPostForm from '../EditForm/EditForm';
import hocAuth from '@/hoc/hocAuth';
import { SIGNIN_URL } from '@/utils/constants';

const ForumEditPostPage: FC = () => {
  const { postId } = useParams();

  return (
    <div className="forum forum-post">
      <Header title={postId ? 'Редактирование темы' : 'Создание темы'} />
      <main className="forum__container forum-post__container">
        <div className="forum-edit__input">
          <ForumEditPostForm />
        </div>
      </main>
    </div>
  );
};

export default hocAuth(ForumEditPostPage, {
  onAuthenticatedRedirection: null,
  onUnauthenticatedRedirection: SIGNIN_URL,
});
