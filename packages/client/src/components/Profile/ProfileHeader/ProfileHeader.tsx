import { MouseEventHandler } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ProfileHeader.css';

interface Props {
  choice: string;
}

export default function ProfileHeader({ choice }: Props) {
  const navigate = useNavigate();

  const goBack: MouseEventHandler<HTMLAnchorElement> = evt => {
    evt.preventDefault();
    navigate(-1);
  };

  return (
    <div className="profile profile_position_left-corner">
      <div className="profile__information profile__information_space_around">
        <Link
          className="profile__link-back profile__information_space_right"
          to="/"
          onClick={goBack}
        />
        <p className="profile__paragraph profile__information_space_right">
          Редактирование профиля
        </p>
        <p className="profile__personal-info profile__information_space_left">
          {choice}
        </p>
      </div>
    </div>
  );
}
