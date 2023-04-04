import React, { FC, useState } from 'react';
import Pagination from '../../Pagination/Pagination';
import ThemeCard from './Card/Card';
import GroupButton from './Group/Button/Button';
import ThemesGroup from './Group/Group';
import './Themes.css';

type Props = {
  pinnedThemes: ForumThemeGroup;
  themes: ForumThemeGroup;
};

const Themes: FC<Props> = ({ pinnedThemes, themes }) => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <section className="forum-themes">
      <div className="form-themes__group">
        <ThemesGroup title={pinnedThemes.title} collapsible={true}>
          {pinnedThemes.themes.map((theme, i) => (
            <li className="forum-themes__item" key={i}>
              <ThemeCard theme={theme} isPinned={true} isAdmin={true} />
            </li>
          ))}
        </ThemesGroup>
      </div>
      <div className="form-themes__group">
        <ThemesGroup
          title={themes.title}
          buttons={[<GroupButton text="+ cоздать новую тему" />]}>
          {themes.themes.map((theme, i) => (
            <li className="forum-themes__item" key={i}>
              <ThemeCard theme={theme} isAdmin={true} />
            </li>
          ))}
        </ThemesGroup>
      </div>
      <Pagination
        currentPage={currentPage}
        totalCount={100}
        pageSize={10}
        onPageChange={setCurrentPage}
      />
    </section>
  );
};

export default Themes;
