import React, { FC, useEffect, useState } from 'react';
import Pagination from '../../Pagination/Pagination';
import ThemeCard from './Card/Card';
import GroupButton from './Group/Button/Button';
import ThemesGroup from './Group/Group';
import ThemesSearch from './Search/Search';
import './Themes.css';

type Props = {
  pinnedThemes: ForumThemeGroup;
  themes: ForumThemeGroup;
};

const Themes: FC<Props> = ({ pinnedThemes, themes }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [filteredThemes, setFilteredThemes] = useState<ForumTheme[]>([]);
  const [filteredPinnedThemes, setFilteredPinnedThemes] = useState<
    ForumTheme[]
  >([]);

  useEffect(() => {
    // для вопросов по игре
    filterThemes(themes.themes, setFilteredThemes);

    filterThemes(pinnedThemes.themes, setFilteredPinnedThemes);
  }, [themes, searchText]);

  const filterThemes = (
    themesList: ForumTheme[],
    callback: (newFilteredThemes: ForumTheme[]) => void
  ) => {
    let newFilteredThemes = [...themesList];
    if (searchText) {
      newFilteredThemes = newFilteredThemes.filter(t =>
        t.title.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    callback(newFilteredThemes);
  };

  return (
    <section className="forum-themes">
      <ThemesSearch value={searchText} onValueChanged={setSearchText} />
      <div className="form-themes__group">
        <ThemesGroup title={pinnedThemes.title} collapsible={true}>
          {filteredPinnedThemes.map((theme, i) => (
            <li className="forum-themes__item" key={i}>
              <ThemeCard theme={theme} isPinned={true} hasEditAccess={true} />
            </li>
          ))}
        </ThemesGroup>
      </div>
      <div className="form-themes__group">
        <ThemesGroup
          title={themes.title}
          buttons={[<GroupButton text="+ cоздать новую тему" />]}>
          {filteredThemes.map((theme, i) => (
            <li className="forum-themes__item" key={i}>
              <ThemeCard theme={theme} hasEditAccess={true} />
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
