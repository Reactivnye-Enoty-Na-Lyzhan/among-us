import { FC, useState } from 'react';
import ProfilePassword from './ProfilePassword/ProfilePassword';
import ProfilePersonalData from './ProfilePersonalData/ProfilePersonalData';
import ProfileHeader from './ProfileHeader/ProfileHeader';
import ProfileAvatar from './ProfileAvatar/ProfileAvatar';
import ProfileNavigation from './ProfileNavigation/ProfileNavigation';
import hocAuth from '@/hoc/hocAuth';
import { SIGNIN_URL } from '@/utils/constants';
import './Profile.css';

const Profile: FC = () => {
  const [choice, setChoice] = useState<
    'Персональные данные' | 'Изменение пароля' | 'Аватар'
  >('Персональные данные');

  const handleChoiceChange = (
    choice: 'Персональные данные' | 'Изменение пароля' | 'Аватар'
  ) => {
    setChoice(choice);
  };

  return (
    /* Измени потом. Profile-page добавил, чтобы сохранить заливку */
    <div className="profile-page">
      <ProfileHeader choice={choice} />
      {choice === 'Персональные данные' && (
        <div className="profile__form profile__form_space_left">
          <ProfilePersonalData choice={choice} />
          <div className="profile__navigation_space_right">
            <ProfileNavigation
              choice={choice}
              handleChoiceChange={handleChoiceChange}
            />
          </div>
        </div>
      )}
      {choice === 'Изменение пароля' && (
        <div className="profile__form profile__form_space_left">
          <ProfilePassword choice={choice} />
          <div className="profile__navigation profile__navigation_space_right">
            <ProfileNavigation
              choice={choice}
              handleChoiceChange={handleChoiceChange}
            />
          </div>
        </div>
      )}
      {choice === 'Аватар' && (
        <div className="profile__form_space_top profile__form_direction_center">
          <ProfileAvatar />
          <ProfileNavigation
            choice={choice}
            handleChoiceChange={handleChoiceChange}
          />
        </div>
      )}
    </div>
  );
};

export default hocAuth(Profile, {
  onAuthenticatedRedirection: null,
  onUnauthenticatedRedirection: SIGNIN_URL,
});
