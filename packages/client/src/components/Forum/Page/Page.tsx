import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../Header/Header';
import Themes from '../Themes/Themes';
import './Page.css';

// TBD: change mockThemes to themes from API
const mockThemes: ForumTheme[] = [
  {
    title:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    author: 'ezhikvtumane',
    avatarUrl: null,
    messagesCount: 5,
    lastMessage: {
      date: 'Сегодня в 17:35',
      author: 'loshadkaaa',
      avatarUrl: null,
      text: null,
    },
  },
  {
    title: 'Заголовок темы может быть разным, но он остаётся прекрасным',
    author: 'ezhikvtumane',
    avatarUrl: null,
    messagesCount: 5,
    lastMessage: {
      date: 'Сегодня в 17:35',
      author: 'loshadkaaa',
      avatarUrl: null,
      text: null,
    },
  },
];

const pinnedThemes: ForumThemeGroup = {
  title: 'Закрепленные темы',
  themes: mockThemes,
};
const themes: ForumThemeGroup = {
  title: 'Вопросы по игре',
  themes: mockThemes,
};

const ForumPage: FC = () => {
  // TBD: temporary solution while we don't have an API
  const { param } = useParams();

  return (
    <div className="forum">
      <Header title={'Форум'} goBackUrl={'/'} />
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

export default ForumPage;
