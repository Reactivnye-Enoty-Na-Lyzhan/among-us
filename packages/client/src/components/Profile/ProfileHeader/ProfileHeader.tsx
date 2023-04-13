import { Link } from 'react-router-dom';
import './ProfileHeader.css';

interface Props {
  choice: string
}

export default function ProfileHeader({choice}: Props){

  return(
    <div className='profile profile_position_left-corner'>
      <div className='profile__information profile__information_space_around'>
        <Link className='profile__link-back profile__information_space_right profile__information_space_m' to="/" />
        <p className='profile__paragraph profile__information_space_right'>Редактирование профиля</p>
        <p className='profile__personal-info profile__information_space_left'>{choice}</p>
      </div>
    </div>
  );
}
