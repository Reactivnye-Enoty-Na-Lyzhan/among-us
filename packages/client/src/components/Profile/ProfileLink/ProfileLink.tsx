import { FC, MouseEventHandler, memo, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ProfileLink.css';

interface IHeading {
  [k: string]: string;
}

interface Props {
  choice: string;
}

const ProfileLink: FC<Props> = ({ choice }) => {
  const headings: IHeading = {
    data: 'Персональные данные',
    password: 'Изменение пароля',
    avatar: 'Аватар',
  };

  const navigate = useNavigate();

  const goBack: MouseEventHandler<HTMLAnchorElement> = useCallback(evt => {
    evt.preventDefault();
    navigate(-1);
  }, []);

  return (
    <Link
      className="profile-link profile-link_spaces_outer"
      to="/"
      onClick={goBack}>
      <span className="profile-link__icon" />
      <h1 className="profile-link__title">Редактирование профиля</h1>
      <h2 className="profile-link__subtitle">{headings[choice]}</h2>
    </Link>
  );
};

export default memo(ProfileLink);
