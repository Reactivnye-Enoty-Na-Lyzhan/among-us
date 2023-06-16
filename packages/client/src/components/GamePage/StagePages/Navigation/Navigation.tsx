import { memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

// Панель навигации
function Navigation() {
  const location = useLocation();

  const howtoplayLocation =
    location.pathname === '/game' ? 'how-to-play' : '../how-to-play';

  return (
    <nav className="startgame-navigation startgame-navigation_spacing_outer">
      <ul className="startgame-navigation__links">
        <li className="startgame-navigation__links-item">
          <Link to="/leaderboard" className="startgame-navigation__link">
            Рейтинг
          </Link>
        </li>
        <li className="startgame-navigation__links-item">
          <Link to="/profile" className="startgame-navigation__link">
            Профиль
          </Link>
        </li>
        <li className="startgame-navigation__links-item">
          <Link to="/forum" className="startgame-navigation__link">
            Форум
          </Link>
        </li>
        <li className="startgame-navigation__links-item">
          <Link
            to={howtoplayLocation}
            className="startgame-navigation__link startgame-navigation__link_highlighted">
            Как играть
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default memo(Navigation);
