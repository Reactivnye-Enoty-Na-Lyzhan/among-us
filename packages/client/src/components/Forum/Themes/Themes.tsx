import React, { FC } from 'react';
import ThemeCard from './Card/Card';
import GroupButton from './Group/Button/Button';
import ThemesGroup from './Group/Group';
import './Themes.css';

type Props = {
  pinnedThemes: ForumThemeGroup;
  themes: ForumThemeGroup;
};

const Themes: FC<Props> = ({ pinnedThemes, themes }) => {
  return (
    <section className="forum-themes">
      <div className="form-themes__group">
        <ThemesGroup title={pinnedThemes.title} collapsible={true}>
          {pinnedThemes.themes.map(theme => (
            <div className="forum-themes__item">
              <ThemeCard theme={theme} isPinned={true} isAdmin={true} />
            </div>
          ))}
        </ThemesGroup>
      </div>
      <div className="form-themes__group">
        <ThemesGroup
          title={themes.title}
          buttons={[<GroupButton text="+ cоздать новую тему" />]}>
          {themes.themes.map(theme => (
            <div className="forum-themes__item">
              <ThemeCard theme={theme} isAdmin={true} />
            </div>
          ))}
        </ThemesGroup>
      </div>
    </section>
  );
};

export default Themes;
