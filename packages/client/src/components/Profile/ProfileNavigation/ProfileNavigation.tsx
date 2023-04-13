import { Link } from 'react-router-dom';
import './ProfileNavigation.css';
import '../Profile.css';

type ProfileChoice = "Персональные данные" | "Изменение пароля" | "Аватар";

interface Props {
  choice: ProfileChoice;
  handleChoiceChange?: (choice: ProfileChoice) => void;
}

export default function ProfileNavigation({choice, handleChoiceChange}: Props){

  type Config = {
    image: (choice: string) => string;
  };
  
  const config: Record<string, Config> = {
    'Персональные данные': {
      image: () => 'profile__navigation-data'
    },
    'Изменение пароля': {
      image: () => 'profile__navigation-password'
    },
    'Аватар': {
      image: () => 'profile__navigation-avatar'
    }
  };

  return(
        <div className='profile__navigation_space_right'>
          <div className={`profile__avatar ${config[choice].image(choice)}`}></div>
          <div className='profile__navigation-links profile__navigation_space_top'>
            {choice === 'Персональные данные' ? (
              <>
                <Link
                  className='profile__navigation-links_left profile__navigation-link'
                  to='/profile'
                  onClick={() => handleChoiceChange && handleChoiceChange('Аватар')}
                >
                  Изменить аватар
                </Link>
                <Link
                  className='profile__navigation-links_right profile__navigation-link'
                  to='/profile'
                  onClick={() => handleChoiceChange && handleChoiceChange('Изменение пароля')}
                >
                  Изменить пароль
                </Link>
              </>
            ) : choice === 'Изменение пароля' ? (
              <>
                <Link
                  className='profile__navigation-links_left profile__navigation-link'
                  to='/profile'
                  onClick={() => handleChoiceChange && handleChoiceChange('Аватар')}
                >
                  Изменить аватар
                </Link>
                <Link
                  className='profile__navigation-links_right profile__navigation-link'
                  to='/profile'
                  onClick={() => handleChoiceChange && handleChoiceChange('Персональные данные')}
                >
                  Изменить данные
                </Link>
              </>
            ) : (
              <div>
                <Link
                  className='profile__navigation-links_left profile__navigation-link'
                  to='/profile'
                  onClick={() => handleChoiceChange && handleChoiceChange('Персональные данные')}
                >
                  Изменить данные
                </Link>
                <Link
                  className='profile__navigation-links_right profile__navigation-link'
                  to='/profile'
                  onClick={() => handleChoiceChange && handleChoiceChange('Изменение пароля')}
                >
                  Изменить пароль
                </Link>
              </div>
            )}
          </div>
        </div>
  );
}

