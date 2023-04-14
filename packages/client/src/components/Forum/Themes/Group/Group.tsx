import classNames from 'classnames';
import React, { FC, useCallback, useState } from 'react';
import './Group.css';

type Props = {
  title: string;
  children: React.ReactNode;
  buttons?: React.ReactNode[];
  collapsible?: boolean;
};

const ThemesGroup: FC<Props> = ({ title, children, collapsible, buttons }) => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = useCallback(() => {
    setCollapsed(prev => !prev);
  }, []);

  return (
    <div
      className={classNames('forum-themes-group', {
        'forum-themes-group_collapsed': collapsed,
      })}>
      <div className="forum-themes-group__title">
        <div className="forum-themes-group__left">
          <span>{title}</span>
          <button
            type="button"
            hidden={!collapsible}
            className={classNames('forum-themes-group__collapse-button', {
              'forum-themes-group__collapse-button_collapsed': collapsed,
            })}
            onClick={toggleCollapsed}
          />
        </div>
        {buttons && buttons.length ? (
          <div className="forum-themes-group__right">
            {buttons.map((b, i) => (
              <div className="forum-themes-group__button" key={i}>
                {b}
              </div>
            ))}
          </div>
        ) : null}
      </div>
      <ul hidden={collapsed} className="forum-themes-group__content">
        {children}
      </ul>
    </div>
  );
};

export default ThemesGroup;
