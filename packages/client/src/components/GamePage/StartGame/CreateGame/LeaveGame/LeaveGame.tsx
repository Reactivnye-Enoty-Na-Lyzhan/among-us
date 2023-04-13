import { FC, memo } from "react";
import { Link } from "react-router-dom";
import './LeaveGame.css';

// Ссылка выхода в меню
const LeaveGame: FC = () => {
  return (
    <Link to=".." className="create-game__leave-game">
      Вернуться в меню
    </Link>);
};

export default memo(LeaveGame);
