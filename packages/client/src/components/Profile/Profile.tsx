import hocAuth from '@/hoc/hocAuth';
import { useLogoutMutation } from '@/store/auth/auth.slice';
import type { IProfileConditionTable, ProfileChoice } from '@/types/profile';
import { SIGNIN_URL } from '@/utils/constants';
import classNames from 'classnames';
import { FC, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileAvatar from './ProfileAvatar/ProfileAvatar';
import ProfileLink from './ProfileLink/ProfileLink';
import ProfileNavigation from './ProfileNavigation/ProfileNavigation';
import ProfilePassword from './ProfilePassword/ProfilePassword';
import ProfilePersonalData from './ProfilePersonalData/ProfilePersonalData';
import ProfileThemeSlider from './ProfileThemeSlider/ProfileThemeSlider';
import './Profile.css';

const Profile: FC = () => {
  const [choice, setChoice] = useState<ProfileChoice>('data');

  const [logout, { isSuccess: isSuccessfullyLogout }] = useLogoutMutation();

  const navigate = useNavigate();

  const mainContainerClassname = classNames('profile-page__container', {
    'profile-page__container_page_avatar': choice === 'avatar',
  });

  const crewmanClassname = classNames('profile-page__crewman', {
    [`profile-page__crewman_page_${choice}`]: choice !== 'avatar',
  });

  const hashReturner: IProfileConditionTable = {
    password: () => <ProfilePassword />,
    data: () => <ProfilePersonalData />,
    avatar: () => <ProfileAvatar />,
  };

  const currentPage = useCallback(() => {
    return hashReturner[choice]();
  }, [choice]);

  const handleChangePage = useCallback((choice: ProfileChoice) => {
    setChoice(choice);
  }, []);

  const handleLogout = async () => {
    await logout();

    if (isSuccessfullyLogout) {
      navigate(SIGNIN_URL);
    }
  };

  return (
    <div className="profile-page">
      <header className="profile-page__header">
        <ProfileLink choice={choice} />
        <ProfileThemeSlider />
      </header>
      <main className={mainContainerClassname}>
        {currentPage()}
        {choice !== 'avatar' && <span className={crewmanClassname} />}
      </main>
      <footer className="profile-page__footer">
        <ProfileNavigation
          choice={choice}
          handleChoiceChange={handleChangePage}
        />
        <span className="profile-page__footer-helper">или</span>
        <button
          className="profile-page__logout-button"
          onClick={handleLogout}
          type="button">
          Выйти из системы
        </button>
      </footer>
    </div>
  );
};

export default hocAuth(Profile);
