import React, { FC, useEffect, useState } from 'react';
// import Pagination from '../../Pagination/Pagination';
import ThemeCard from './Card/Card';
import ForumEmpty from './Empty/Empty';
import GroupButton from './Group/Button/Button';
import ThemesGroup from './Group/Group';
import ThemesSearch from './Search/Search';
import './Themes.css';
import { ForumThemeGroup } from '../types';
import { ForumPostType } from '@/store/forum/forum.types';
import { useNavigate } from 'react-router-dom';

type Props = {
  pinnedThemes: ForumThemeGroup;
  themes: ForumThemeGroup;
};

const Themes: FC<Props> = ({ pinnedThemes, themes }) => {
  // const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [filteredThemes, setFilteredThemes] = useState<ForumPostType[]>([]);
  const [filteredPinnedThemes, setFilteredPinnedThemes] = useState<
    ForumPostType[]
  >([]);

  const navigate = useNavigate();

  useEffect(() => {
    // для вопросов по игре
    filterThemes(themes.themes, setFilteredThemes);

    filterThemes(pinnedThemes.themes, setFilteredPinnedThemes);
  }, [themes, searchText]);

  const filterThemes = (
    themesList: ForumPostType[],
    callback: (newFilteredThemes: ForumPostType[]) => void
  ) => {
    let newFilteredThemes = [...themesList];
    if (searchText) {
      newFilteredThemes = newFilteredThemes.filter(t =>
        t.title.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    callback(newFilteredThemes);
  };

  if (themes.themes.length === 0 && pinnedThemes.themes.length === 0) {
    return (
      <section className="forum-themes">
        <div className="form-themes__group">
          <ThemesGroup
            title={themes.title}
            buttons={[
              <GroupButton
                text="+ cоздать новую тему"
                onClick={() => {
                  navigate('/forum/create');
                }}
              />,
            ]}>
            <ForumEmpty />
          </ThemesGroup>
        </div>
      </section>
    );
  }

  return (
    <section className="forum-themes">
      <ThemesSearch value={searchText} onValueChanged={setSearchText} />
      {pinnedThemes.themes.length > 0 ? (
        <div className="form-themes__group">
          <ThemesGroup title={pinnedThemes.title} collapsible={true}>
            {filteredPinnedThemes.map(theme => (
              <li className="forum-themes__item" key={theme.id}>
                <ThemeCard theme={theme} isPinned={true} hasEditAccess={true} />
              </li>
            ))}
          </ThemesGroup>
        </div>
      ) : null}
      <div className="form-themes__group">
        <ThemesGroup
          title={themes.title}
          buttons={[
            <GroupButton
              text="+ cоздать новую тему"
              onClick={() => {
                navigate('/forum/create');
              }}
            />,
          ]}>
          {filteredThemes.map(theme => (
            <li className="forum-themes__item" key={theme.id}>
              <ThemeCard theme={theme} hasEditAccess={true} />
            </li>
          ))}
        </ThemesGroup>
      </div>
      {/* <Pagination
        currentPage={currentPage}
        totalCount={themes.themes.length}
        pageSize={3}
        onPageChange={setCurrentPage}
      /> */}
    </section>
  );
};

export default Themes;
