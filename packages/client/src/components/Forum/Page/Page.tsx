import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../Header/Header';
import Themes from '../Themes/Themes';
import hocAuth from '@/hoc/hocAuth';
import { SIGNIN_URL } from '@/utils/constants';
import './Page.css';
import { useGetPostsDataQuery } from '@/store/forum/forum.api';
import { ForumThemeGroup } from '../types';

const ForumPage: FC = () => {
  const { param } = useParams();
  const { data } = useGetPostsDataQuery();

  const [pinnedThemes, setPinnedThemes] = useState<ForumThemeGroup>({
    title: 'Закрепленные темы',
    themes: [],
  });
  const [themes, setThemes] = useState<ForumThemeGroup>({
    title: 'Вопросы по игре',
    themes: [],
  });

  useEffect(() => {
    setPinnedThemes({
      ...pinnedThemes,
      themes: data?.filter(d => d.pinned) ?? [],
    });

    setThemes({
      ...themes,
      themes: data?.filter(d => !d.pinned) ?? [],
    });
  }, [data]);

  return (
    <div className="forum">
      <Header title={'Форум'} />
      <main className="forum__container">
        <Themes
          pinnedThemes={
            param === 'empty' ? { ...pinnedThemes, themes: [] } : pinnedThemes
          }
          themes={param === 'empty' ? { ...themes, themes: [] } : themes}
        />
      </main>
    </div>
  );
};

export default hocAuth(ForumPage, {
  onAuthenticatedRedirection: null,
  onUnauthenticatedRedirection: SIGNIN_URL,
});
