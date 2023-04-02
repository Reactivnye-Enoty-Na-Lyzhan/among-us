import React, { FC } from 'react';
import ThemeCard from './Card/Card';
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
          {pinnedThemes.themes.map(topic => (
            <div className="forum-themes__item">
              <ThemeCard topic={topic} />
            </div>
          ))}
        </ThemesGroup>
      </div>
      <div className="form-themes__group">
        <ThemesGroup title={themes.title}>
          {themes.themes.map(topic => (
            <div className="forum-themes__item">
              <ThemeCard topic={topic} />
            </div>
          ))}
        </ThemesGroup>
      </div>
    </section>
  );
};

export default Themes;
