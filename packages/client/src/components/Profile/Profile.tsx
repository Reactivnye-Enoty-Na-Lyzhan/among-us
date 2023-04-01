import { Link } from 'react-router-dom';
import ProfileForm from '../ProfileForm/ProfileForm';
import './Profile.css';

export default function Profile(){
  return(
    <div className='profile'>
      <div className='profile__information profile__information_space_around'>
        <Link className='profile__link-back profile__information_space_right profile__information_space_m' to="/" />
        <p className='profile__paragraph profile__information_space_right'>Редактирование профиля</p>
        <p className='profile__personal-info profile__information_space_left'>Персональные данные</p>
      </div>
      <div className='profile__form profile__form_space_left'>
        <div>
          <ProfileForm />
        </div>
        <div className='profile__navigation profile__navigation_space_right'>
          <div className='profile__navigation-img'></div>
          <div className='profile__navigation-links'>
            <Link className='profile__navigation-links_left profile__navigation-link' to="/change-avatar">Изменить аватар</Link>
            <Link className='profile__navigation-links_right profile__navigation-link' to="/change-password" >Изменить пароль</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
