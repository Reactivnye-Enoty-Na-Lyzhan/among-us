import React from 'react';
import Header from '../../Header/Header';
import Themes from '../Themes/Themes';
import './Page.css';

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

export default function () {
  return (
    <div className="forum">
      <Header title={'Форум'} goBackUrl={'/'} />
      <main className="forum__container">
        <Themes pinnedThemes={pinnedThemes} themes={themes} />
      </main>
    </div>
  );
}
