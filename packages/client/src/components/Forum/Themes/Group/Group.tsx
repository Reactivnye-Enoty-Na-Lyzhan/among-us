import classNames from 'classnames';
import React, { useCallback, useState } from 'react';
import './Group.css';

type Props = {
  title: string;
  children: React.ReactNode;
  collapsible?: boolean;
};

const ThemesGroup = ({ title, children, collapsible }: Props) => {
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
      <div hidden={collapsed} className="forum-themes-group__content">
        {children}
      </div>
    </div>
  );
};

export default ThemesGroup;
