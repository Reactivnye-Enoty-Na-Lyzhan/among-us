import { FC, MouseEventHandler } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Header.css';

type Props = {
  title: string;
};

const Header: FC<Props> = ({ title }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const goBack: MouseEventHandler<HTMLAnchorElement> = evt => {
    evt.preventDefault();

    if (location.hash) {
      navigate('/forum');
    } else {
      navigate(-1);
    }
  };

  return (
    <header className="page-header">
      <Link className="page-header__go-back" to="/" onClick={goBack}></Link>
      <h1 className="page-header__title">{title}</h1>
    </header>
  );
};

export default Header;
