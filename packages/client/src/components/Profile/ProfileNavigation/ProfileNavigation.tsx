import { FC, MouseEventHandler, memo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import type { ProfileChoice } from '@/types/profile';
import './ProfileNavigation.css';
import { useGetUserQuery } from '@/store/auth/auth.slice';

interface Props {
  choice: ProfileChoice;
  handleChoiceChange: (choice: ProfileChoice) => void;
}

const ProfileNavigation: FC<Props> = ({
  choice,
  handleChoiceChange,
}) => {

  const {data: userData} = useGetUserQuery();

  const handleLinkClick: MouseEventHandler<HTMLAnchorElement> = useCallback((evt) => {
    evt.preventDefault();
    const pathname = evt.currentTarget.pathname.substring(1) as ProfileChoice;
    handleChoiceChange(pathname);
  }, []);

  return (
    <nav className="profile-navigation">
      <ul className="profile-navigation__links">
        {choice !== 'data' &&
          <li className="profile-navigation__link-item">
            <Link to='/data' className={"profile-navigation__link"} onClick={handleLinkClick}>
              Изменить данные
            </Link>
          </li>}
        {choice !== 'password' && !userData?.yandexId &&
          <li className="profile-navigation__link-item">
            <Link to='/password' className="profile-navigation__link" onClick={handleLinkClick}>
              Изменить пароль
            </Link>
          </li>}
        {choice !== 'avatar' &&
          <li className="profile-navigation__link-item">
            <Link to='/avatar' className="profile-navigation__link" onClick={handleLinkClick}>
              Изменить аватар
            </Link>
          </li>}
      </ul>
    </nav>
  );

};

export default memo(ProfileNavigation);
