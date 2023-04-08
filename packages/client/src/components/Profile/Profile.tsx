import ProfilePassword from './ProfilePassword/ProfilePassword';
import ProfilePersonalData from './ProfilePersonalData/ProfilePersonalData';
import ProfileHeader from './ProfileHeader/ProfileHeader';
import ProfileAvatar from './ProfileAvatar/ProfileAvatar';
import ProfileNavigation from './ProfileNavigation/ProfileNavigation';
import './Profile.css';

interface Props {
  choice: 'Персональные данные' | "Изменение пароля" | "Аватар";
  handleChoiceChange?: (choice: 'Персональные данные' | "Изменение пароля" | "Аватар") => void;
}

export default function Profile({ choice, handleChoiceChange }: Props) {
  return (
    <div>
      <ProfileHeader choice={choice}/>
      {choice === 'Персональные данные' && (
        <div className='profile__form profile__form_space_left'>
          <ProfilePersonalData choice={choice}/>
          <div className='profile__navigation_space_right'>
            <ProfileNavigation choice={choice} handleChoiceChange={handleChoiceChange}/> 
          </div>
        </div>
      )}
      {choice === 'Изменение пароля' && (
        <div className='profile__form profile__form_space_left'>
          <ProfilePassword choice={choice}/>
          <div className='profile__navigation profile__navigation_space_right'>
            <ProfileNavigation choice={choice} handleChoiceChange={handleChoiceChange}/>
          </div>
        </div>
      )}
      {choice === 'Аватар' && (
        <div className='profile__form_space_top profile__form_direction_center'>
          <ProfileAvatar />
          <ProfileNavigation choice={choice} handleChoiceChange={handleChoiceChange}/>
        </div>
      )}
    </div>
  );
}
