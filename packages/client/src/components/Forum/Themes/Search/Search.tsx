import React, { FC } from 'react';
import './Search.css';

type Props = {
  value: string;
  onValueChanged: (value: string) => void;
};

const ThemesSearch: FC<Props> = ({ value, onValueChanged }) => {
  return (
    <div className="forum-themes-search">
      <input
        value={value}
        type="text"
        className="forum-themes-search__input"
        placeholder="Поиск"
        onChange={e => {
          onValueChanged(e.target.value ?? '');
        }}
      />
    </div>
  );
};

export default ThemesSearch;
